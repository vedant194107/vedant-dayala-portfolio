import fs from 'fs';
import path from 'path';
import { ProjectData, ProfileData, JourneyMilestone, ContactMessage, ContactDetails } from '@/types';
import { projectsData as defaultProjects } from '@/data/projects';
import { profileData as defaultProfile } from '@/data/profile';
import { journeyData as defaultJourney } from '@/data/journey';

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
  journey: JourneyMilestone[];
  contactDetails: ContactDetails;
  messages: ContactMessage[];
  lastUpdated: string;
}

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
  journey: defaultJourney,
  contactDetails: DEFAULT_CONTACT_DETAILS,
  messages: [],
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

    // Merge defaults for any newly added fields
    let updated = false;
    if (!parsed.journey) {
      parsed.journey = defaultJourney;
      updated = true;
    }
    if (!parsed.contactDetails) {
      parsed.contactDetails = DEFAULT_CONTACT_DETAILS;
      updated = true;
    }
    if (!parsed.messages) {
      parsed.messages = [];
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
    }

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
