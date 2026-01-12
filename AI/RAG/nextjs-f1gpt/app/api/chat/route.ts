import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";
import OpenAI from "openai";

const { PINECONE_API_KEY, HF_TOKEN } = process.env;

const client = new InferenceClient(HF_TOKEN);

const llm = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HF_TOKEN,
});

interface MovieMetadata {
  id: string;
  text: string;
  url: string;
  [key: string]: any;
}

const pinecone = new Pinecone({
  apiKey: `${PINECONE_API_KEY}`,
});

const index = pinecone.index<MovieMetadata>("movies");

const generateEmbedding = async (text: string): Promise<number[]> => {
  const output = await client.featureExtraction({
    model: "sangmini/msmarco-cotmae-MiniLM-L12_en-ko-ja",
    inputs: text,
  });
  return Array.isArray(output[0]) ? output[0] : output;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the latest user message
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    // Generate embedding for the user's query
    const embeddings = await generateEmbedding(latestMessage);

    try {
      // Query Pinecone for similar documents
      const queryResponse = await index.query({
        vector: embeddings,
        topK: 10,
        includeMetadata: true,
      });

      // Extract the text from the matched documents
      const docs = queryResponse.matches.map((match) => match.metadata?.text);

      docContext = JSON.stringify(docs);
    } catch (error) {
      console.log(`Error querying Pinecone: ${error}`);
      docContext = "";
    }

    // Create the system prompt with context
    const systemPrompt = `You are an AI assistant who knows everything about movies. Use the below context to augment what you know about movies. The context will provide you with the most recent page data from Wikipedia and other websites. If the context doesn't include the information you need, answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include. Format your response using markdown where applicable and do not return images.

---------------------
START CONTEXT
${docContext}
END CONTEXT
---------------------

Question: ${latestMessage}
---------------------`;

    const formattedMessages = messages.map(({ role, content }: any) => ({
      role,
      content,
    }));

    // Create chat completion with streaming
    const chatCompletion = await llm.chat.completions.create({
      model: "openai/gpt-oss-20b:groq",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...formattedMessages,
      ],
      stream: true,
    });

    // Convert OpenAI stream to Response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of chatCompletion) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
