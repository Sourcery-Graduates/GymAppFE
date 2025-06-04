import fs from 'fs/promises';
import path from 'path';
import { request, APIRequestContext } from '@playwright/test';

type StorageState = {
  cookies: Array<{
    name: string;
    value: string;
    domain: string;
    path: string;
    expires: number; // -1 means the cookie does not expire
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'Strict' | 'Lax' | 'None';
  }>;
  origins: Array<{
    origin: string;
    localStorage: Array<{ name: string; value: string }>;
  }>;
};

export async function createApiContextFromStorageState(storageStatePath: string): Promise<APIRequestContext> {
  // Read storageState from user.json
  const data = await fs.readFile(path.resolve(storageStatePath), 'utf-8');
  const storageState: StorageState = JSON.parse(data);

  // Find localStorage for origin http://localhost:3000
  const originData = storageState.origins.find((o) => o.origin === 'http://localhost:3000');
  if (!originData) throw new Error('No localStorage found for origin http://localhost:3000');

  // Find ROCP_token
  const tokenItem = originData.localStorage.find((item) => item.name === 'ROCP_token');
  if (!tokenItem) throw new Error('No ROCP_token found in localStorage');

  // Remove "" if exist
  const token = tokenItem.value.replace(/^"(.*)"$/, '$1');

  // Create new request context with Bearer token
  const apiContext = await request.newContext({
    baseURL: 'http://localhost:8080', // backend API URL
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiContext;
}
