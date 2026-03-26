import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const DATA_DIR = path.join(os.homedir(), '.ideacli');
const DATA_FILE = path.join(DATA_DIR, 'ideas.json');

export interface Idea {
  key: string;
  content: string;
  createdAt: string;
}

function ensureStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
  }
}

function readData(): Record<string, Idea> {
  ensureStorage();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writeData(data: Record<string, Idea>): void {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function saveIdea(key: string, content: string): void {
  const data = readData();
  data[key] = {
    key,
    content,
    createdAt: new Date().toISOString(),
  };
  writeData(data);
}

export function getIdea(key: string): Idea | undefined {
  const data = readData();
  return data[key];
}

export function listIdeas(): Idea[] {
  const data = readData();
  return Object.values(data);
}

export function deleteIdea(key: string): boolean {
  const data = readData();
  if (data[key]) {
    delete data[key];
    writeData(data);
    return true;
  }
  return false;
}
