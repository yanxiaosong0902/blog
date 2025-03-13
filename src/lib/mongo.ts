import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

export function connect() {
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  const connection = new MongoClient(uri)
  return connection
}
