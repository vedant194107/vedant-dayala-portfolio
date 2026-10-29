'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, KeyRound, User, Mail, Shield, Plus, Edit2, 
  Trash2, ExternalLink, Save, Check, AlertCircle, 
  RefreshCw, LogOut, Search, Eye, ArrowUpRight, 
  Layers, Settings, LayoutDashboard, Database, 
  FileText, Sparkles, X, ChevronRight, MessageSquare, 
  Send, Radio, MapPin, Calendar, GraduationCap, Briefcase, 
  CheckCircle, Clock, Reply 
} from 'lucide-react';
import { ProjectData, ProfileData, JourneyMilestone, ContactMessage, ContactDetails } from '@/types';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { useAudioEffect } from '@/hooks/useAudioEffect';

type AdminTab = 'projects' | 'journey' | 'messages' | 'contact' | 'profile' | 'settings';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auth Form State
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginLoading, setLoginLoading] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectSearch, setProjectSearch] = useState('');
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Journey Milestones State
  const [journey, setJourney] = useState<JourneyMilestone[]>([]);
  const [journeySearch, setJourneySearch] = useState('');
  const [editingMilestone, setEditingMilestone] = useState<JourneyMilestone | null>(null);
  const [isNewMilestone, setIsNewMilestone] = useState(false);
  const [deleteMilestoneConfirmId, setDeleteMilestoneConfirmId] = useState<string | null>(null);

  // Contact Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageSearch, setMessageSearch] = useState('');

  // Contact Details State
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
  const [contactSaving, setContactSaving] = useState(false);

  // Profile State
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Settings State: Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  const { playClick, playHover } = useAudioEffect();

  // Show Toast
  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Check Auth Status on Mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadDashboardData();
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [projRes, profRes, jourRes, msgRes, contactRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/profile'),
        fetch('/api/admin/journey'),
        fetch('/api/admin/messages'),
        fetch('/api/admin/contact'),
      ]);

      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData.projects || []);
      }

      if (profRes.ok) {
        const profData = await profRes.json();
        setProfile(profData.profile);
      }

      if (jourRes.ok) {
        const jourData = await jourRes.json();
        setJourney(jourData.journey || []);
      }

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages || []);
      }

      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactDetails(contactData.contactDetails);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    playClick();

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        showToast('success', 'Welcome to Vedant Dayala Admin Atelier');
        loadDashboardData();
      } else {
        showToast('error', data.error || 'Authentication failed');
      }
    } catch {
      showToast('error', 'Connection error occurred');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    playClick();
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    showToast('success', 'Logged out successfully');
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      playClick();
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', `Project "${data.project.name}" saved successfully!`);
        setEditingProject(null);
        setIsNewProject(false);
        loadDashboardData();
      } else {
        showToast('error', data.error || 'Failed to save project');
      }
    } catch {
      showToast('error', 'Error saving project');
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    try {
      playClick();
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('success', 'Project removed from repository');
        setDeleteConfirmId(null);
        loadDashboardData();
      } else {
        showToast('error', 'Failed to delete project');
      }
    } catch {
      showToast('error', 'Delete operation failed');
    }
  };

  // Save Journey Milestone
  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;

    try {
      playClick();
      const res = await fetch('/api/admin/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMilestone),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', `Milestone "${data.milestone.title}" saved successfully!`);
        setEditingMilestone(null);
        setIsNewMilestone(false);
        loadDashboardData();
      } else {
        showToast('error', data.error || 'Failed to save milestone');
      }
    } catch {
      showToast('error', 'Error saving milestone');
    }
  };

  // Delete Journey Milestone
  const handleDeleteMilestone = async (id: string) => {
    try {
      playClick();
      const res = await fetch(`/api/admin/journey/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('success', 'Journey milestone removed');
        setDeleteMilestoneConfirmId(null);
        loadDashboardData();
      } else {
        showToast('error', 'Failed to delete milestone');
      }
    } catch {
      showToast('error', 'Delete operation failed');
    }
  };

  // Toggle Message Read Status
  const handleToggleMessageRead = async (id: string) => {
    try {
      playClick();
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    try {
      playClick();
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('success', 'Message deleted from inbox');
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      showToast('error', 'Failed to delete message');
    }
  };

  // Save Contact Details
  const handleSaveContactDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactDetails) return;

    try {
      setContactSaving(true);
      playClick();
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDetails),
      });

      if (res.ok) {
        showToast('success', 'Contact section details updated across the portfolio!');
      } else {
        showToast('error', 'Failed to update contact details');
      }
    } catch {
      showToast('error', 'Error updating contact details');
    } finally {
      setContactSaving(false);
    }
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setProfileSaving(true);
      playClick();
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        showToast('success', 'Profile and bio details updated across the portfolio!');
      } else {
        showToast('error', 'Failed to update profile');
      }
    } catch {
      showToast('error', 'Error updating profile');
    } finally {
      setProfileSaving(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      showToast('error', 'New password must be at least 6 characters');
      return;
    }

    try {
      setPasswordSaving(true);
      playClick();
      const res = await fetch('/api/admin/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', 'Admin password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast('error', data.error || 'Failed to change password');
      }
    } catch {
      showToast('error', 'Error changing password');
    } finally {
      setPasswordSaving(false);
    }
  };

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const q = projectSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Filtered Journey Milestones
  const filteredJourney = journey.filter((m) => {
    const q = journeySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.year.toLowerCase().includes(q) ||
      m.organization.toLowerCase().includes(q) ||
      m.roleOrDegree.toLowerCase().includes(q)
    );
  });

  // Filtered Messages
  const filteredMessages = messages.filter((m) => {
    const q = messageSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  // Add Project
  const handleAddNewProject = () => {
    playClick();
    setIsNewProject(true);
    setEditingProject({
      id: '',
      number: (projects.length + 1).toString().padStart(2, '0'),
      name: '',
      category: 'Enterprise Full-Stack System',
      impact: '',
      description: '',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      featured: true,
      year: new Date().getFullYear().toString(),
      clientOrContext: 'Full-Stack Architecture',
      role: 'Lead Full-Stack Developer',
      architectureNotes: 'Engineered with relational schemas and responsive UI.',
      demoUrl: '',
      githubUrl: '',
      accentColor: '#38f0d0',
      caseStudy: {
        challenge: '',
        solution: '',
        technicalHighlights: ['Production deployed', 'Accessible responsive UI'],
        outcomes: '',
      },
    });
  };

  // Add Milestone
  const handleAddNewMilestone = () => {
    playClick();
    setIsNewMilestone(true);
    setEditingMilestone({
      id: `m-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      period: 'Present',
      title: '',
      roleOrDegree: 'Full-Stack Developer',
      organization: 'Engineering Platform',
      location: 'Ahmedabad, India',
      type: 'experience',
      description: '',
      keyAchievements: ['Engineered scalable web applications', 'Optimized database response times'],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    });
  };

  // Loading Screen
  if (loading) {
    return (
      <main className="min-h-screen bg-obsidian-950 text-foreground flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyanAccent border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs text-sandstone-400">Synchronizing Atelier Admin...</p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-obsidian-950 text-foreground flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-copper-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-cyanAccent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 jali-grid opacity-10 pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Header Monogram */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-charcoal-900/80 border border-copper-400/40 shadow-glowCopper mb-2">
              <span className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyanAccent to-sandstone-300">
                VD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-medium text-foreground tracking-tight">
              Atelier Admin Portal
            </h1>
            <p className="font-mono text-xs text-sandstone-400">
              Authentication required to manage portfolio, journey, and inquiries.
            </p>
          </div>

          {/* Toast Alert */}
          {message && (
            <div
              className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                message.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
              }`}
            >
              {message.type === 'success' ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Login Card */}
          <form
            onSubmit={handleLogin}
            className="chiseled-card rounded-2xl p-6 sm:p-8 space-y-5 border border-sandstone-500/20 bg-charcoal-900/60 backdrop-blur-md"
          >
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-sandstone-300 block">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-sandstone-300 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Quick Fill Hint */}
            <div className="p-3 rounded-lg bg-obsidian-950/80 border border-charcoal-800 flex items-center justify-between font-mono text-[11px] text-charcoal-400">
              <span>Default Credentials:</span>
              <button
                type="button"
                onClick={() => {
                  setLoginUsername('admin');
                  setLoginPassword('admin123');
                }}
                className="text-cyanAccent hover:underline"
              >
                admin / admin123
              </button>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-xl bg-copper-500/25 border border-copper-400/50 hover:bg-copper-500/35 text-cyanAccent font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-glowCyan flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-cyanAccent border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate to Console</span>
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="text-center">
            <Link
              href="/"
              className="font-mono text-xs text-sandstone-400 hover:text-cyanAccent transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------------------------------
  // DASHBOARD MAIN VIEW
  // --------------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-obsidian-950 text-foreground pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Executive Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-charcoal-900/60 border border-sandstone-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-copper-600/20 border border-copper-400/40 flex items-center justify-center text-cyanAccent font-bold">
              VD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-semibold text-foreground">
                  Atelier Control Center
                </h1>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live JSON Sync
                </span>
              </div>
              <p className="font-mono text-xs text-sandstone-400">
                Vedant Dayala Full-Stack Platform Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-sandstone-300 hover:text-cyanAccent hover:border-cyanAccent/40 transition-colors flex items-center gap-1.5"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300 hover:bg-rose-900/40 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Toast Alert */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-mono flex items-center justify-between border ${
              message.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)} className="opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-charcoal-800 pb-3" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'projects'}
            onClick={() => {
              playClick();
              setActiveTab('projects');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'journey'}
            onClick={() => {
              playClick();
              setActiveTab('journey');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'journey'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Journey & Timeline ({journey.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'messages'}
            onClick={() => {
              playClick();
              setActiveTab('messages');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 relative ${
              activeTab === 'messages'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyanAccent text-obsidian-950 font-bold text-[10px]">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'contact'}
            onClick={() => {
              playClick();
              setActiveTab('contact');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Contact Section</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'profile'}
            onClick={() => {
              playClick();
              setActiveTab('profile');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Identity & Profile</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'settings'}
            onClick={() => {
              playClick();
              setActiveTab('settings');
            }}
            className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Admin Security</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* TAB 1: PROJECTS REGISTRY */}
        {/* ================================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter projects by name, category, or tag..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-charcoal-900/60 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <button
                onClick={handleAddNewProject}
                className="px-4 py-2 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all flex items-center justify-center gap-2 shadow-glowCyan whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/20 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyanAccent">
                        {project.number}
                      </span>
                      <span className="font-mono text-[10px] text-charcoal-400 uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/allproject/${project.id}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-cyanAccent transition-colors"
                        title="View Public Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          playClick();
                          setIsNewProject(false);
                          setEditingProject({ ...project });
                        }}
                        className="p-1.5 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-sandstone-200 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          playClick();
                          setDeleteConfirmId(project.id);
                        }}
                        className="p-1.5 rounded hover:bg-rose-950/60 text-charcoal-400 hover:text-rose-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-medium text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-xs text-sandstone-300 mt-1 line-clamp-2">
                      {project.impact}
                    </p>
                  </div>

                  {/* Display Demo and GitHub URLs */}
                  <div className="font-mono text-[11px] text-charcoal-400 space-y-1 pt-1">
                    {project.demoUrl && (
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-copper-400">Live Demo:</span>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyanAccent hover:underline truncate"
                        >
                          {project.demoUrl}
                        </a>
                      </div>
                    )}
                    {project.githubUrl && (
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-charcoal-500">GitHub:</span>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline truncate"
                        >
                          {project.githubUrl}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-obsidian-950 border border-charcoal-800 text-sandstone-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-obsidian-950 text-charcoal-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-charcoal-900/30 border border-charcoal-800 font-mono text-xs text-charcoal-400">
                No projects found matching your query.
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: JOURNEY & MILESTONES */}
        {/* ================================================================== */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter milestones by title, year, or organization..."
                  value={journeySearch}
                  onChange={(e) => setJourneySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-charcoal-900/60 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <button
                onClick={handleAddNewMilestone}
                className="px-4 py-2 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all flex items-center justify-center gap-2 shadow-glowCyan whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            {/* Milestones List */}
            <div className="space-y-4">
              {filteredJourney.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/20 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-cyanAccent px-2 py-0.5 rounded bg-copper-900/30 border border-copper-400/30">
                        {item.year}
                      </span>
                      <span className="font-mono text-xs text-sandstone-400">
                        ({item.period})
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-charcoal-800 text-copper-300">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          playClick();
                          setIsNewMilestone(false);
                          setEditingMilestone({ ...item });
                        }}
                        className="p-1.5 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-sandstone-200 transition-colors"
                        title="Edit Milestone"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          playClick();
                          setDeleteMilestoneConfirmId(item.id);
                        }}
                        className="p-1.5 rounded hover:bg-rose-950/60 text-charcoal-400 hover:text-rose-400 transition-colors"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-copper-300 mt-0.5">
                      {item.roleOrDegree} · {item.organization} ({item.location})
                    </p>
                    <p className="text-xs text-sandstone-300 mt-2 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Achievements */}
                  {item.keyAchievements && item.keyAchievements.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-charcoal-800/60">
                      <span className="font-mono text-[10px] uppercase text-charcoal-400 block">
                        Key Accomplishments:
                      </span>
                      <ul className="space-y-1">
                        {item.keyAchievements.map((ach, idx) => (
                          <li key={idx} className="text-xs text-sandstone-300 flex items-start gap-2">
                            <span className="text-cyanAccent mt-0.5">▪</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-obsidian-950 border border-charcoal-800 text-sandstone-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filteredJourney.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-charcoal-900/30 border border-charcoal-800 font-mono text-xs text-charcoal-400">
                No milestones found.
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: INBOX / MESSAGES FROM CONTACT FORM */}
        {/* ================================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inquiries by sender, email, subject, or message..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-charcoal-900/60 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="font-mono text-xs text-sandstone-400 flex items-center gap-2">
                <span>Total: {messages.length}</span>
                <span>·</span>
                <span className="text-cyanAccent font-semibold">Unread: {unreadMessagesCount}</span>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3 ${
                    msg.read
                      ? 'bg-charcoal-900/40 border-charcoal-800'
                      : 'bg-charcoal-900/80 border-cyanAccent/40 shadow-glowCyan'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-cyanAccent animate-ping" />
                      )}
                      <span className="font-display text-base font-semibold text-foreground">
                        {msg.name}
                      </span>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="font-mono text-xs text-copper-300 hover:text-cyanAccent hover:underline"
                      >
                        &lt;{msg.email}&gt;
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-charcoal-400">
                        {new Date(msg.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>

                      <button
                        onClick={() => handleToggleMessageRead(msg.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-colors ${
                          msg.read
                            ? 'bg-obsidian-950 text-charcoal-400 border-charcoal-800 hover:text-white'
                            : 'bg-cyanAccent/15 text-cyanAccent border-cyanAccent/40'
                        }`}
                      >
                        {msg.read ? 'Mark Unread' : 'Mark Read'}
                      </button>

                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="p-1.5 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-cyanAccent transition-colors"
                        title="Reply via Email"
                      >
                        <Reply className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded hover:bg-rose-950 text-charcoal-400 hover:text-rose-400 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold text-cyanAccent block">
                      Subject: {msg.subject}
                    </span>
                    <div className="p-4 rounded-xl bg-obsidian-950 border border-charcoal-800/80 mt-2">
                      <p className="text-sm text-sandstone-200 leading-relaxed font-sans whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-charcoal-900/30 border border-charcoal-800 space-y-2">
                <MessageSquare className="w-8 h-8 text-charcoal-500 mx-auto" />
                <p className="font-mono text-xs text-sandstone-400">
                  No inquiries received yet. Any messages dispatched from the website contact form will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: CONTACT SECTION DETAILS (FROM ATTACHED IMAGE 1) */}
        {/* ================================================================== */}
        {activeTab === 'contact' && contactDetails && (
          <form
            onSubmit={handleSaveContactDetails}
            className="p-6 sm:p-8 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/20 space-y-6"
          >
            <div className="border-b border-charcoal-800 pb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-copper-400" />
                <h2 className="text-xl font-display font-semibold text-foreground">
                  Contact Section Copy & Coordinates (Image 1)
                </h2>
              </div>
              <p className="font-mono text-xs text-sandstone-400 mt-0.5">
                Edit the text, direct email, location, and blueprint labels displayed in the public contact quadrant.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Contact Section Headline
                </label>
                <input
                  type="text"
                  required
                  value={contactDetails.headline}
                  onChange={(e) => setContactDetails({ ...contactDetails, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="e.g. Let’s collaborate on something remarkable."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Contact Section Description Paragraph
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactDetails.description}
                  onChange={(e) => setContactDetails({ ...contactDetails, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-sandstone-300 block">
                    Direct Atelier Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactDetails.directEmail}
                    onChange={(e) => setContactDetails({ ...contactDetails, directEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-sandstone-300 block">
                    Location Stamp
                  </label>
                  <input
                    type="text"
                    required
                    value={contactDetails.location}
                    onChange={(e) => setContactDetails({ ...contactDetails, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-sandstone-300 block">
                    Coordinates Stamp
                  </label>
                  <input
                    type="text"
                    value={contactDetails.coordinates}
                    onChange={(e) => setContactDetails({ ...contactDetails, coordinates: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-sandstone-300 block">
                    Form Box Title
                  </label>
                  <input
                    type="text"
                    value={contactDetails.formTitle}
                    onChange={(e) => setContactDetails({ ...contactDetails, formTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Form Box Subtitle
                </label>
                <input
                  type="text"
                  value={contactDetails.formSubtitle}
                  onChange={(e) => setContactDetails({ ...contactDetails, formSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-800 flex justify-end">
              <button
                type="submit"
                disabled={contactSaving}
                className="px-6 py-2.5 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all flex items-center gap-2 shadow-glowCyan"
              >
                <Save className="w-4 h-4" />
                <span>{contactSaving ? 'Saving Changes...' : 'Save Contact Details'}</span>
              </button>
            </div>
          </form>
        )}

        {/* ================================================================== */}
        {/* TAB 5: PROFILE & IDENTITY */}
        {/* ================================================================== */}
        {activeTab === 'profile' && profile && (
          <form
            onSubmit={handleSaveProfile}
            className="p-6 sm:p-8 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/20 space-y-6"
          >
            <div className="border-b border-charcoal-800 pb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Developer Identity & Public Story
              </h2>
              <p className="font-mono text-xs text-sandstone-400 mt-0.5">
                Updates reflected immediately on the homepage and about sections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  required
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Base Location
                </label>
                <input
                  type="text"
                  required
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>
            </div>

            {/* Availability Status */}
            <div className="space-y-1.5 pt-2">
              <label className="font-mono text-xs text-sandstone-300 block">
                Work Availability Status & Pill
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={profile.availability.status}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      availability: {
                        ...profile.availability,
                        status: e.target.value as 'available' | 'limited' | 'busy',
                      },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                >
                  <option value="available">Available (Green/Cyan Pulse)</option>
                  <option value="limited">Limited Slots</option>
                  <option value="busy">Busy / In-House</option>
                </select>

                <input
                  type="text"
                  value={profile.availability.label}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      availability: { ...profile.availability, label: e.target.value },
                    })
                  }
                  placeholder="Availability label description..."
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                />
              </div>
            </div>

            {/* Bio Story Paragraphs */}
            <div className="space-y-2 pt-2">
              <label className="font-mono text-xs text-sandstone-300 block">
                Narrative Bio Paragraphs
              </label>
              {profile.bioStory.map((para, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-mono text-[10px] text-charcoal-500 uppercase">
                    Paragraph {idx + 1}
                  </span>
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => {
                      const newStory = [...profile.bioStory];
                      newStory[idx] = e.target.value;
                      setProfile({ ...profile, bioStory: newStory });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm text-sandstone-200 focus:outline-none focus:border-cyanAccent font-sans"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-charcoal-800 flex justify-end">
              <button
                type="submit"
                disabled={profileSaving}
                className="px-6 py-2.5 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all flex items-center gap-2 shadow-glowCyan"
              >
                <Save className="w-4 h-4" />
                <span>{profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {/* ================================================================== */}
        {/* TAB 6: ADMIN SECURITY & SETTINGS */}
        {/* ================================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-2xl">
            {/* Change Admin Password */}
            <form
              onSubmit={handleChangePassword}
              className="p-6 sm:p-8 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/20 space-y-5"
            >
              <div className="border-b border-charcoal-800 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-copper-400" />
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Update Admin Password
                  </h2>
                </div>
                <p className="font-mono text-xs text-sandstone-400 mt-0.5">
                  Change the master authentication secret for this admin console.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="Enter current password..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  New Password (min. 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="Enter new password..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-sandstone-300 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-charcoal-700 text-sm font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                  placeholder="Re-type new password..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-5 py-2 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all flex items-center gap-2 shadow-glowCyan"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{passwordSaving ? 'Updating...' : 'Save New Password'}</span>
                </button>
              </div>
            </form>

            {/* Factory Reset Card */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <h3 className="text-sm font-display font-semibold text-rose-300">
                Reset All Projects to Factory Defaults
              </h3>
              <p className="text-xs text-sandstone-400 font-sans">
                If needed, you can reset all projects and profile configurations to their initial shipped state.
              </p>
              <button
                type="button"
                onClick={async () => {
                  if (confirm('Are you sure you want to restore defaults? Any custom projects will be reset.')) {
                    await fetch('/api/admin/reset', { method: 'POST' });
                    showToast('success', 'Restored portfolio to factory defaults');
                    loadDashboardData();
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs font-mono text-rose-300 hover:bg-rose-900/60 transition-colors"
              >
                Reset to Default State
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* EDIT / CREATE PROJECT MODAL */}
        {/* ================================================================== */}
        {editingProject && (
          <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-2xl w-full my-8 bg-charcoal-900 border border-sandstone-500/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyanAccent font-semibold">
                    {isNewProject ? 'CREATE' : 'EDIT'}
                  </span>
                  <span className="font-mono text-xs text-charcoal-400">/</span>
                  <h2 className="text-lg font-display font-medium text-foreground">
                    {isNewProject ? 'Add New Project' : editingProject.name}
                  </h2>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-1 rounded text-charcoal-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.name}
                      onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="e.g. Distributed Analytics Suite"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Category *
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    >
                      <option value="Enterprise Full-Stack System">Enterprise Full-Stack System</option>
                      <option value="Full-Stack Management SaaS">Full-Stack Management SaaS</option>
                      <option value="AI & Interactive Experience">AI & Interactive Experience</option>
                      <option value="Financial Telemetry & Audit">Financial Telemetry & Audit</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Number (e.g. 01)
                    </label>
                    <input
                      type="text"
                      value={editingProject.number}
                      onChange={(e) => setEditingProject({ ...editingProject, number: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Year
                    </label>
                    <input
                      type="text"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Impact Tagline (Short Summary) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.impact}
                    onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                    placeholder="Brief 1-sentence value proposition..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Full Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Role
                    </label>
                    <input
                      type="text"
                      value={editingProject.role}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Domain / Context
                    </label>
                    <input
                      type="text"
                      value={editingProject.clientOrContext}
                      onChange={(e) => setEditingProject({ ...editingProject, clientOrContext: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Demo / Live URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.demoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.githubUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Tech Stack Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    placeholder="Next.js 14, React, Prisma ORM, MySQL, Tailwind CSS"
                  />
                </div>

                {/* Case Study Details */}
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-charcoal-800 space-y-3">
                  <span className="font-mono text-[10px] uppercase text-cyanAccent block font-semibold">
                    Deep Dive Case Study Information
                  </span>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-charcoal-400 block">
                      The Operational Challenge
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.challenge || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            ...editingProject.caseStudy,
                            challenge: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-charcoal-900 border border-charcoal-700 text-xs text-sandstone-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-charcoal-400 block">
                      The Architectural Solution
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.solution || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            ...editingProject.caseStudy,
                            solution: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-charcoal-900 border border-charcoal-700 text-xs text-sandstone-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-charcoal-400 block">
                      Outcomes & Results
                    </label>
                    <input
                      type="text"
                      value={editingProject.caseStudy?.outcomes || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            ...editingProject.caseStudy,
                            outcomes: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-charcoal-900 border border-charcoal-700 text-xs text-sandstone-200"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="font-mono text-xs text-charcoal-400 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all shadow-glowCyan"
                  >
                    {isNewProject ? 'Create Project' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* EDIT / CREATE JOURNEY MILESTONE MODAL */}
        {/* ================================================================== */}
        {editingMilestone && (
          <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="max-w-2xl w-full my-8 bg-charcoal-900 border border-sandstone-500/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyanAccent font-semibold">
                    {isNewMilestone ? 'ADD MILESTONE' : 'EDIT MILESTONE'}
                  </span>
                  <span className="font-mono text-xs text-charcoal-400">/</span>
                  <h2 className="text-lg font-display font-medium text-foreground">
                    {isNewMilestone ? 'Add Journey Milestone' : editingMilestone.title}
                  </h2>
                </div>
                <button
                  onClick={() => setEditingMilestone(null)}
                  className="p-1 rounded text-charcoal-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMilestone} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Milestone Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMilestone.title}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="e.g. Full-Stack Systems Architecture"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Type *
                    </label>
                    <select
                      value={editingMilestone.type}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, type: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    >
                      <option value="experience">Experience</option>
                      <option value="education">Education</option>
                      <option value="milestone">Milestone</option>
                      <option value="product">Product</option>
                      <option value="open-source">Open Source</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMilestone.year}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="2024"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Period Display
                    </label>
                    <input
                      type="text"
                      value={editingMilestone.period}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, period: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="e.g. Present or 2023 — 2024"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Role or Degree
                    </label>
                    <input
                      type="text"
                      value={editingMilestone.roleOrDegree}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, roleOrDegree: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                      placeholder="e.g. Full-Stack Software Engineer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-sandstone-300 block">
                      Organization / University
                    </label>
                    <input
                      type="text"
                      value={editingMilestone.organization}
                      onChange={(e) => setEditingMilestone({ ...editingMilestone, organization: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingMilestone.location}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, location: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    placeholder="Ahmedabad, Gujarat, India"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Description Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={editingMilestone.description}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-sans text-foreground focus:outline-none focus:border-cyanAccent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Key Achievements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingMilestone.keyAchievements) ? editingMilestone.keyAchievements.join('\n') : editingMilestone.keyAchievements}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        keyAchievements: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-sandstone-200"
                    placeholder="Built enterprise platform cutting order processing cycles by 74%&#10;Integrated Next.js 14 App Router and Prisma ORM"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-sandstone-300 block">
                    Tags / Technologies (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingMilestone.tags) ? editingMilestone.tags.join(', ') : editingMilestone.tags}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-obsidian-950 border border-charcoal-700 text-xs font-mono text-foreground focus:outline-none focus:border-cyanAccent"
                    placeholder="Next.js 14, Prisma ORM, TypeScript, MySQL"
                  />
                </div>

                <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingMilestone(null)}
                    className="font-mono text-xs text-charcoal-400 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all shadow-glowCyan"
                  >
                    {isNewMilestone ? 'Create Milestone' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* DELETE MILESTONE CONFIRMATION MODAL */}
        {/* ================================================================== */}
        {deleteMilestoneConfirmId && (
          <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-sm w-full bg-charcoal-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-base font-display font-semibold text-rose-300">
                Confirm Milestone Deletion
              </h3>
              <p className="text-xs text-sandstone-300 font-sans">
                Are you sure you want to permanently delete this journey milestone?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteMilestoneConfirmId(null)}
                  className="font-mono text-xs text-charcoal-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMilestone(deleteMilestoneConfirmId)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/40 border border-rose-400 text-rose-200 font-mono text-xs hover:bg-rose-600/60 transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* DELETE PROJECT CONFIRMATION MODAL */}
        {/* ================================================================== */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-obsidian-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-sm w-full bg-charcoal-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-base font-display font-semibold text-rose-300">
                Confirm Project Deletion
              </h3>
              <p className="text-xs text-sandstone-300 font-sans">
                Are you sure you want to permanently delete this project from the portfolio? This cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="font-mono text-xs text-charcoal-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(deleteConfirmId)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/40 border border-rose-400 text-rose-200 font-mono text-xs hover:bg-rose-600/60 transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
