// INDEXING stage

// npx tsx app/scripts/loadDB.ts

import * as path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import "dotenv/config";

// Get teh current directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Given to us by the repo. Define the metadata type locally
interface MovieMetadata {
  id: string;
  [key: string]: any;
}

//Embedding data 
interface EmbeddingData {
  movie: MovieMetadata;
  embedding: number[];
}


// Bringing in the pinecone database api key and the index 
// that we want to upload our information into.
const pinecone = new Pinecone({
  apiKey: `${process.env.PINECONE_API_KEY}`,
});
const index = pinecone.index<MovieMetadata>("movies");


/**
 * Generate Pinecone records from embeddings data.
 */

// funtion will grab all the necessary info from the .json file. 
// id movie id from the .json  file e.g. [1000] 
// values which is the embedding [0.48,0.31,0.58]
// metadata which is the movie information [cast, director, genre, orign, plot, title, etc]
const generatePineconeRecords = (embeddingsData: EmbeddingData[]): PineconeRecord<MovieMetadata>[] => {

  const pineconeRecords: PineconeRecord<MovieMetadata>[] = [];

  for (const { movie, embedding } of embeddingsData) {
    pineconeRecords.push({
      id: movie.id,
      values: embedding,
      metadata: movie,
    });
  }
  return pineconeRecords;
};

/**
 * Create batches of Pinecone records for upserting.
 * Refer to the Pinecone documentation: https://docs.pinecone.io/guides/data/upsert-data
 */
const createPineconeBatches = (vectors: PineconeRecord<MovieMetadata>[],batchSize = 200): PineconeRecord<MovieMetadata>[][] => {
  const batches: PineconeRecord<MovieMetadata>[][] = [];
  for (let i = 0; i < vectors.length; i += batchSize) {
    batches.push(vectors.slice(i, i + batchSize));
  }
  return batches;
};

/**
 * Upsert batches of Pinecone records to Pinecone.
 * Provide logging for each batch you try to, including the IDs of the first and last records in the batch.
 * Log the success or failure of each batch upsert.
 */
const upsertBatchesToPinecone = async (pineconeBatches: PineconeRecord<MovieMetadata>[][]): Promise<void> => {
  const delayBatch = (ms: number): Promise<void> =>new Promise((resolve) => setTimeout(resolve, ms));

  const upsertResults = await Promise.allSettled(pineconeBatches.map(async (batch, i) => {
      // await delayBatch(1000 * i); // Uncomment if you're getting Pinecone network errors
      console.log(`Upserting batch ${i + 1} of ${pineconeBatches.length}: IDs ${batch[0].id} 
        through ${batch[batch.length - 1].id}`
      );
      return index.upsert(batch);
    })
  );

  upsertResults.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Batch ${i + 1} upserted successfully.`);
    } else {
      console.error(`Failed to upsert batch ${i + 1}:`, result.reason);
    }
  });
};

const loadVariableFromJSON = async <T>(filePath: string): Promise<T | null> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(`Data loaded from ${filePath}`);
    return JSON.parse(data) as T;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.warn(`File ${filePath} does not exist.`);
      return null;
    } else {
      console.error(`Failed to load data from ${filePath}:`, error);
      return null;
    }
  }
};

const main = async (): Promise<void> => {
  // Script is at: app/scripts/loadDB.ts
  // Data is at: app/api/data/embeddings_data.json
  // Go up one level from scripts, then into api/data
  const embeddingsPath = path.resolve(
    __dirname,
    "../api/data/embeddings_data.json"
  );

  const embeddingsData = await loadVariableFromJSON<EmbeddingData[]>(
    embeddingsPath
  );
  if (!embeddingsData) {
    throw new Error("Embeddings data not found.");
  }

  const pineconeRecords = generatePineconeRecords(embeddingsData);
  const pineconeBatches = createPineconeBatches(pineconeRecords);
  await upsertBatchesToPinecone(pineconeBatches);
};

main().catch((error) => {
  console.error("An error occurred in main:", error);
  process.exit(1);
});
