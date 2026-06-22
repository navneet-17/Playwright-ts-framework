import dotenv from 'dotenv';
import path from 'path';

// ✅ Load .env at module initialization
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export class ApiConfig {
  // ✅ Load and validate API key once
  private static readonly API_KEY = this.validateApiKey();
  
  public static readonly API_ENDPOINT = process.env.API_ENDPOINT;

  // ✅ Headers as class constant — use everywhere
  public static readonly API_HEADERS = {
    'content-type': 'application/json',
    'x-api-key': this.API_KEY
  };

  // ✅ Validation: fail fast if .env missing
  private static validateApiKey(): string {
    const key = process.env.API_KEY;
    if (!key) {
      throw new Error('API_KEY not found in .env file');
    }
    return key;
  }

  // ✅ Get headers (in case you need to extend them per-request)
  static getHeaders(additionalHeaders?: Record<string, string>) {
    return {
      ...this.API_HEADERS,
      ...additionalHeaders
    };
  }
}