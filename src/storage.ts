import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const DATA_DIR = path.join(os.homedir(), '.ideacli');
const DATA_FILE = path.join(DATA_DIR, 'ideas.json');

export interface Idea {
  key: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
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

export function saveIdea(key: string, content: string, tags?: string[]): void {
  const data = readData();
  data[key] = {
    key,
    content,
    createdAt: new Date().toISOString(),
    tags: tags || [],
  };
  writeData(data);
}

export function editIdea(key: string, content: string, tags?: string[]): boolean {
  const data = readData();
  if (!data[key]) return false;

  data[key] = {
    ...data[key],
    content,
    updatedAt: new Date().toISOString(),
  };

  if (tags) {
    data[key].tags = tags;
  }

  writeData(data);
  return true;
}

export function searchIdeas(query: string): Idea[] {
  const data = readData();
  const lowerQuery = query.toLowerCase();
  return Object.values(data).filter((idea) => {
    const inKey = idea.key.toLowerCase().includes(lowerQuery);
    const inContent = idea.content.toLowerCase().includes(lowerQuery);
    const inTags = idea.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
    return inKey || inContent || inTags;
  });
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
