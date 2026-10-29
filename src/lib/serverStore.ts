import fs from 'fs';
import path from 'path';
import os from 'os';
import { ProjectData, ProfileData, JourneyMilestone, ContactMessage, ContactDetails } from '@/types';
import { projectsData as defaultProjects } from '@/data/projects';
import { profileData as defaultProfile } from '@/data/profile';
import { journeyData as defaultJourney } from '@/data/journey';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'portfolio-store.json');
const TMP_STORE_PATH = path.join(os.tmpdir(), 'portfolio-store.json');

declare global {
  // eslint-disable-next-line no-var
  var __portfolio_store: PortfolioStore | undefined;
}

export interface AdminUser {
  username: string;
  password: string; // Stored securely
  email: string;
}

export interface PortfolioStore {
  admin: AdminUser;
  profile: ProfileData;
  projects: ProjectData[];
  categories: string[];
  journey: JourneyMilestone[];
  contactDetails: ContactDetails;
  messages: ContactMessage[];
  lastUpdated: string;
}

export const DEFAULT_CATEGORIES: string[] = [
  'Enterprise Full-Stack System',
  'Full-Stack Management SaaS',
  'AI & Interactive Experience',
  'Financial Telemetry & Audit',
];

const DEFAULT_CONTACT_DETAILS: ContactDetails = {
  headline: "Let's collaborate on something remarkable.",
  description: "Whether you are planning a high-performance web platform, an exploratory 3D spatial experience, or seeking full-stack engineering expertise, my inbox is open.",
  formTitle: "Transmit Project Specification",
  formSubtitle: "Fill out the blueprint below to initiate discussion.",
  directEmail: "vedantdayala@gmail.com",
  location: "Ahmedabad, Gujarat",
  coordinates: "23.0225° N, 72.5714° E",
};

const DEFAULT_STORE: PortfolioStore = {
  admin: {
    username: 'admin',
    password: 'admin123',
    email: 'vedantdayala@gmail.com',
  },
  profile: defaultProfile,
  projects: defaultProjects,
  categories: DEFAULT_CATEGORIES,
  journey: defaultJourney,
  contactDetails: DEFAULT_CONTACT_DETAILS,
  messages: [],
  lastUpdated: new Date().toISOString(),
};

// Ensure directory and store file exist
function initStoreFile(): PortfolioStore {
  // 1. In-memory cached instance
  if (globalThis.__portfolio_store) {
    return globalThis.__portfolio_store;
  }

  // 2. Check /tmp on serverless environments (Vercel)
  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      const raw = fs.readFileSync(TMP_STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      globalThis.__portfolio_store = parsed;
      return parsed;
    }
  } catch {
    // Ignore and fallback to file store
  }

  // 3. Check process.cwd() data/portfolio-store.json
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      globalThis.__portfolio_store = parsed;
      return parsed;
    }
  } catch {
    // Ignore and fallback
  }

  // 4. Default baseline store
  globalThis.__portfolio_store = DEFAULT_STORE;
  return DEFAULT_STORE;
}

export function getStore(): PortfolioStore {
  return initStoreFile();
}

export function saveStore(store: PortfolioStore): void {
  store.lastUpdated = new Date().toISOString();
  globalThis.__portfolio_store = store;

  // Try saving to data/portfolio-store.json (works in local dev)
  let savedLocally = false;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
    savedLocally = true;
  } catch {
    // Read-only filesystem on Vercel (EROFS) - proceed to writable /tmp
  }

  // Write to /tmp for serverless persistence across requests
  if (!savedLocally) {
    try {
      fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
    } catch {
      // In-memory store remains updated in globalThis
    }
  }
}

// Project CRUD Operations
export function getStoredProjects(): ProjectData[] {
  const store = getStore();
  const projects = store.projects || [];
  return projects.map((p) => ({
    ...p,
    status: p.status || 'active',
    images: Array.isArray(p.images) ? p.images : [],
  }));
}

export function getStoredProjectById(id: string): ProjectData | undefined {
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id);
}

export function saveStoredProject(project: ProjectData): ProjectData {
  const store = getStore();
  if (!store.projects) store.projects = [];
  
  const sanitizedProject: ProjectData = {
    ...project,
    status: project.status || 'active',
    images: Array.isArray(project.images) ? project.images : [],
  };

  const existingIndex = store.projects.findIndex((p) => p.id === sanitizedProject.id);

  if (existingIndex >= 0) {
    store.projects[existingIndex] = { ...sanitizedProject };
  } else {
    store.projects.push(sanitizedProject);
  }

  // Ensure category is tracked
  if (sanitizedProject.category) {
    if (!store.categories) store.categories = [...DEFAULT_CATEGORIES];
    if (!store.categories.includes(sanitizedProject.category)) {
      store.categories.push(sanitizedProject.category);
    }
  }

  saveStore(store);
  return sanitizedProject;
}

export function toggleProjectStatus(id: string, status: 'active' | 'deleted'): ProjectData | null {
  const store = getStore();
  const project = (store.projects || []).find((p) => p.id === id);
  if (!project) return null;
  project.status = status;
  saveStore(store);
  return project;
}

export function deleteStoredProject(id: string, permanent: boolean = false): boolean {
  const store = getStore();
  if (!permanent) {
    const project = (store.projects || []).find((p) => p.id === id);
    if (project) {
      project.status = 'deleted';
      saveStore(store);
      return true;
    }
    return false;
  }

  const initialLength = (store.projects || []).length;
  store.projects = (store.projects || []).filter((p) => p.id !== id);

  if (store.projects.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

// Category Operations
export function getStoredCategories(): string[] {
  const store = getStore();
  const list = store.categories || DEFAULT_CATEGORIES;
  const fromProjects = (store.projects || []).map((p) => p.category).filter(Boolean);
  return Array.from(new Set([...list, ...fromProjects]));
}

export function saveStoredCategory(category: string): string[] {
  const store = getStore();
  if (!store.categories) store.categories = [...DEFAULT_CATEGORIES];
  const cat = category.trim();
  if (cat && !store.categories.includes(cat)) {
    store.categories.push(cat);
    saveStore(store);
  }
  return getStoredCategories();
}

export function deleteStoredCategory(category: string): string[] {
  const store = getStore();
  if (!store.categories) store.categories = [...DEFAULT_CATEGORIES];
  const cat = category.trim();
  store.categories = store.categories.filter((c) => c !== cat);
  saveStore(store);
  return getStoredCategories();
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

// Journey Operations
export function getStoredJourney(): JourneyMilestone[] {
  const store = getStore();
  return store.journey || [];
}

export function saveStoredMilestone(milestone: JourneyMilestone): JourneyMilestone {
  const store = getStore();
  if (!store.journey) store.journey = [];
  const existingIndex = store.journey.findIndex((m) => m.id === milestone.id);

  if (existingIndex >= 0) {
    store.journey[existingIndex] = { ...milestone };
  } else {
    store.journey.unshift(milestone);
  }

  saveStore(store);
  return milestone;
}

export function deleteStoredMilestone(id: string): boolean {
  const store = getStore();
  if (!store.journey) return false;
  const initialLength = store.journey.length;
  store.journey = store.journey.filter((m) => m.id !== id);

  if (store.journey.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

// Contact Details Operations
export function getStoredContactDetails(): ContactDetails {
  const store = getStore();
  return store.contactDetails || DEFAULT_CONTACT_DETAILS;
}

export function saveStoredContactDetails(details: ContactDetails): ContactDetails {
  const store = getStore();
  store.contactDetails = details;
  saveStore(store);
  return details;
}

// Contact Messages Operations
export function getStoredMessages(): ContactMessage[] {
  const store = getStore();
  return store.messages || [];
}

export function saveContactMessage(msg: { name: string; email: string; subject: string; message: string }): ContactMessage {
  const store = getStore();
  if (!store.messages) store.messages = [];

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...msg,
    createdAt: new Date().toISOString(),
    read: false,
  };

  store.messages.unshift(newMessage);
  saveStore(store);
  return newMessage;
}

export function toggleMessageRead(id: string): boolean {
  const store = getStore();
  if (!store.messages) return false;
  const message = store.messages.find((m) => m.id === id);
  if (message) {
    message.read = !message.read;
    saveStore(store);
    return true;
  }
  return false;
}

export function deleteStoredMessage(id: string): boolean {
  const store = getStore();
  if (!store.messages) return false;
  const initialLength = store.messages.length;
  store.messages = store.messages.filter((m) => m.id !== id);

  if (store.messages.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

export function resetStoreToDefault(): PortfolioStore {
  const freshStore: PortfolioStore = {
    ...DEFAULT_STORE,
    lastUpdated: new Date().toISOString(),
  };
  saveStore(freshStore);
  return freshStore;
}
