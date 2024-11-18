import { MongoClient } from 'mongodb';

let client;
let mongoDB;

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  mongoDB = global._mongoClientPromise;
} else {
  // In production mode, use a new client instance
  client = new MongoClient(uri);
  mongoDB = client.connect();
}

export default mongoDB;
