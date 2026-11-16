import { MockDatabase, SEED_DATA } from './seed';

const STORAGE_KEY = 'orbitflow_saas_db_v2';
const TOKEN_KEY = 'orbitflow_token';

function cloneSeed(): MockDatabase {
  return JSON.parse(JSON.stringify(SEED_DATA)) as MockDatabase;
}

export function readMockDb(): MockDatabase {
  if (typeof window === 'undefined') return cloneSeed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = cloneSeed();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw) as MockDatabase;
  } catch {
    return cloneSeed();
  }
}

export function writeMockDb(db: MockDatabase): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function getMockToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setMockToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}
