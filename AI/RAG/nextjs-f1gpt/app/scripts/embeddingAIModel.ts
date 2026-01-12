// npx tsx app/scripts/loadDB.ts
// INDEXING stage

import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { InferenceClient } from "@huggingface/inference";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

// id chunk_277
// Chazelle said that the romantic dinner that Sebastian prepared for Mia was "one of the scenes that I think I wrote and rewrote and rewrote more than any other in the script"
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const movieData = [
  "https://en.wikipedia.org/wiki/Parasite_(1982_film)",
  "https://en.wikipedia.org/wiki/Cabin_Fever_(2002_film)",
  "https://en.wikipedia.org/wiki/La_La_Land",
];

// Define the metadata type locally
interface MovieMetadata {
  id: string;
  text: string;
  url: string;
  [key: string]: any;
}

const pinecone = new Pinecone({
  apiKey: `${process.env.PINECONE_API_KEY}`,
});
const index = pinecone.index<MovieMetadata>("movies");

const client = new InferenceClient(process.env.HF_TOKEN);

/**
 * Scrape a webpage and return clean text content
 */
const scrapePage = async (url: string): Promise<string> => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: true },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });

  return (await loader.scrape())?.replace(/<[^>]*>?/gm, "") || "";
};

/**
 * Generate embedding function for a text chunk using HuggingFace AI Model (1536 dimensions)
 *  that is supported by our vector database (1536 dimensions) Using cosine similarity
 */

const generateEmbedding = async (text: string): Promise<number[]> => {
  const output = await client.featureExtraction({
    model: "sangmini/msmarco-cotmae-MiniLM-L12_en-ko-ja",
    inputs: text,
  });

  // The output is the embedding vector
  // e.g. [0.445, 0.81,0.43]
  return Array.isArray(output[0]) ? output[0] : output;
};

/**
 * Load sample data: scrape pages, chunk text, generate embeddings, upsert to Pinecone
 */
const loadSampleData = async () => {
  console.log("Starting to load sample data...");

  let chunkIdCounter = 0;

  for (const url of movieData) {
    console.log(`\nScraping: ${url}`);

    // Scrape the page
    const content = await scrapePage(url);
    console.log(`Scraped ${content.length} characters`);

    // Split into chunks
    const chunks = await splitter.splitText(content);
    console.log(`Split into ${chunks.length} chunks`);

    // Process each chunk
    const records: PineconeRecord<MovieMetadata>[] = [];

    for (const chunk of chunks) {
      const chunkId = `chunk_${chunkIdCounter++}`;
      console.log(`Processing ${chunkId}...`);

      // Generate embedding
      // After we chunk the data from the website scraping we generate embeddings
      // each chunk will then be pushed in the index with an embedding
      const embedding = await generateEmbedding(chunk);

      console.log(`  Generated embedding with ${embedding.length} dimensions`);

      // Create Pinecone record
      // will be pushed into the pinecone vector db
      // id
      // value: which is the embedding of the chunk that we get from the AI model
      // metadata [id, text, url]

      records.push({
        id: chunkId,
        values: embedding,
        metadata: {
          id: chunkId,
          text: chunk,
          url: url,
        },
      });
    }

    // Upsert to Pinecone in batches
    // that pinecone record is pushed into pinecone vector db
    console.log(`Upserting ${records.length} records to Pinecone...`);
    const batches = createPineconeBatches(records);
    await upsertBatchesToPinecone(batches);
  }

  console.log("\n✅ Sample data loaded successfully!");
};

/**
 * Create batches of Pinecone records for upserting.
 */
const createPineconeBatches = (
  vectors: PineconeRecord<MovieMetadata>[],
  batchSize = 100
): PineconeRecord<MovieMetadata>[][] => {
  const batches: PineconeRecord<MovieMetadata>[][] = [];
  for (let i = 0; i < vectors.length; i += batchSize) {
    batches.push(vectors.slice(i, i + batchSize));
  }
  return batches;
};

/**
 * Upsert batches of Pinecone records to Pinecone.
 */
const upsertBatchesToPinecone = async (
  pineconeBatches: PineconeRecord<MovieMetadata>[][]
): Promise<void> => {
  const upsertResults = await Promise.allSettled(
    pineconeBatches.map(async (batch, i) => {
      console.log(
        `  Upserting batch ${i + 1} of ${pineconeBatches.length}: IDs ${
          batch[0].id
        } through ${batch[batch.length - 1].id}`
      );
      return index.upsert(batch);
    })
  );

  upsertResults.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`  ✓ Batch ${i + 1} upserted successfully.`);
    } else {
      console.error(`  ✗ Failed to upsert batch ${i + 1}:`, result.reason);
    }
  });
};

// Run the script
loadSampleData().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
