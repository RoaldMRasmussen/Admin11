import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Define and export environment variables
export const ENV = {
  USER_NAME: process.env.USER_NAME || '',
  PASSWORD: process.env.PASSWORD || '',
  PASSWORD2: process.env.PASSWORD2 || '',
  FAKE_NAME: process.env.FAKE_NAME || '',
  FAKE_PASSWORD: process.env.FAKE_PASSWORD || ''
};

// Validate required environment variables
const requiredVars = ['USER_NAME', 'PASSWORD'];
for (const varName of requiredVars) {
  if (!ENV[varName]) {
    throw new Error(`${varName} environment variable must be set`);
  }
}
