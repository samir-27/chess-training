import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.dirname(serverDirectory);
dotenv.config({ path: path.join(projectDirectory, '.env') });
dotenv.config({ path: path.join(serverDirectory, '.env') });
import process from 'node:process';
import mongoose from 'mongoose';
import { createApp } from './app.js';

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || '127.0.0.1';

const server = createApp().listen(port, host, () => {
  console.info(`Chess analysis API listening at http://${host}:${port}`);
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10_000
  }).then(() => {
    console.info('Connected to MongoDB.');
  }).catch(() => {
    console.warn('MongoDB connection failed. The API remains available in local-only mode.');
  });
} else {
  console.warn('MongoDB is not configured. The API remains available in local-only mode.');
}

const shutdown = async () => {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
