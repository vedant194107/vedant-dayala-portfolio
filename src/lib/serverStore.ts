import fs from 'fs';
import path from 'path';
import { ProjectData, ProfileData } from '@/types';
import { projectsData as defaultProjects } from '@/data/projects';
import { profileData as defaultProfile } from '@/data/profile';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'portfolio-store.json');

export interface AdminUser {
  username: string;
  password: string; // Stored securely
  email: string;
}

export interface PortfolioStore {
  admin: AdminUser;
  profile: ProfileData;
  projects: ProjectData[];
  lastUpdated: string;
}

const DEFAULT_STORE: PortfolioStore = {
  admin: {
    username: 'admin',
    password: 'admin123',
    email: 'vedantdayala@gmail.com',
  },
  profile: defaultProfile,
  projects: defaultProjects,
  lastUpdated: new Date().toISOString(),
};

// Ensure directory and store file exist
function initStoreFile(): PortfolioStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), 'utf-8');
      return DEFAULT_STORE;
    }

    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.error('Failed to read or initialize portfolio store:', error);
    return DEFAULT_STORE;
  }
}

export function getStore(): PortfolioStore {
  return initStoreFile();
}

export function saveStore(store: PortfolioStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    store.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save portfolio store:', error);
    throw error;
  }
}

// Project CRUD Operations
export function getStoredProjects(): ProjectData[] {
  const store = getStore();
  return store.projects || [];
}

export function getStoredProjectById(id: string): ProjectData | undefined {
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id);
}

export function saveStoredProject(project: ProjectData): ProjectData {
  const store = getStore();
  const existingIndex = store.projects.findIndex((p) => p.id === project.id);

  if (existingIndex >= 0) {
    store.projects[existingIndex] = { ...project };
  } else {
    store.projects.push(project);
  }

  saveStore(store);
  return project;
}

export function deleteStoredProject(id: string): boolean {
  const store = getStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);

  if (store.projects.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

// Profile Operations
export function getStoredProfile(): ProfileData {
  const store = getStore();
  return store.profile || defaultProfile;
}

export function saveStoredProfile(profile: ProfileData): ProfileData {
  const store = getStore();
  store.profile = profile;
  saveStore(store);
  return profile;
}

// Admin Auth Operations
export function verifyAdminCredentials(username: string, password: string):boolean {
  const store = getStore();
  return (
    store.admin.username === username.trim() &&
    store.admin.password === password.trim()
  );
}

export function updateAdminPassword(currentPass: string, newPass: string): boolean {
  const store = getStore();
  if (store.admin.password !== currentPass.trim()) {
    return false;
  }
  store.admin.password = newPass.trim();
  saveStore(store);
  return true;
}

export function updateAdminSettings(settings: Partial<AdminUser>): AdminUser {
  const store = getStore();
  store.admin = {
    ...store.admin,
    ...settings,
  };
  saveStore(store);
  return store.admin;
}

export function resetStoreToDefault(): PortfolioStore {
  const freshStore: PortfolioStore = {
    ...DEFAULT_STORE,
    lastUpdated: new Date().toISOString(),
  };
  saveStore(freshStore);
  return freshStore;
}
