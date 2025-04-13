// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI =
  process.env.MONGODB_URI || '=mongodb://localhost:27017/revision-lm'
const MONGODB_DB = process.env.MONGODB_DB || 'revision-lm'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable')
}

let cachedClient: MongoClient
let cachedDb: any

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Create a new connection
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

  await client.connect()
  const db = client.db(MONGODB_DB)

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}
