'use client';

import React, { useState, useEffect } from 'react';
import { Send, MapPin, Copy, Check, AlertCircle, Radio, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { profileData } from '@/data/profile';
import { ContactDetails } from '@/types';
import Button from '@/components/ui/Button';
import TimeDisplay from '@/components/ui/TimeDisplay';
import Reveal from '@/components/ui/Reveal';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const DEFAULT_CONTACT_DETAILS: ContactDetails = {
  headline: "Let’s collaborate on something remarkable.",
  description: "Whether you are planning a high-performance web platform, an exploratory 3D spatial experience, or seeking full-stack engineering expertise, my inbox is open.",
  formTitle: "Transmit Project Specification",
  formSubtitle: "Fill out the blueprint below to initiate discussion.",
  directEmail: profileData.email,
  location: "Ahmedabad, Gujarat",
  coordinates: profileData.coordinates,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [contactDetails, setContactDetails] = useState<ContactDetails>(DEFAULT_CONTACT_DETAILS);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { playClick, playSuccess, playHover } = useAudioEffect();

  useEffect(() => {
    fetch('/api/admin/contact')
      .then((res) => res.json())
      .then((data) => {
        if (data.contactDetails) {
          setContactDetails(data.contactDetails);
        }
      })
      .catch(() => {});
  }, []);

  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or organization.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide a contact email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please add a brief subject.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please include details about your inquiry.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters of detail.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!validateForm()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        playSuccess();
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleCopyEmail = () => {
    playClick();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(contactDetails.directEmail || profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Dispatch a Signal / Contact"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-900/60 atelier-grid"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <Reveal direction="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sandstone-500/15 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
                <span className="font-semibold text-cyanAccent">06</span>
                <span>/</span>
                <span className="uppercase tracking-widest">Signal Dispatch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
                Have an idea worth building?
              </h2>
            </div>
            <p className="font-mono text-xs text-sandstone-400/80 max-w-xs text-left sm:text-right">
              Transmit a direct signal into the Ahmedabad night workshop.
            </p>
          </div>
        </Reveal>

        {/* Split Grid: Left Signal Tower Info, Right Accessible Transmission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Workshop Coordinates & Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="fade-right" delay={0.15}>
              <div className="chiseled-card rounded-2xl p-6 sm:p-8 space-y-6 border border-sandstone-500/20">
                <div className="flex items-center gap-2 text-cyanAccent font-mono text-xs uppercase tracking-wider">
                  <Radio className="w-4 h-4 animate-pulse text-copper-400" />
                  <span>Atelier Transmission Line</span>
                </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground">
                  {contactDetails.headline}
                </h3>
                <p className="text-xs sm:text-sm text-sandstone-300 leading-relaxed font-sans">
                  {contactDetails.description}
                </p>
              </div>

              {/* Direct Email with Quick Copy */}
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-charcoal-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-charcoal-400">
                    Direct Atelier Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-cyanAccent hover:text-white transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-cyanAccent" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-copper-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-sm text-sandstone-200 select-all">
                  {contactDetails.directEmail}
                </p>
              </div>

              {/* Location & Time Stamp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-sandstone-400 font-mono text-[10px]">
                    <MapPin className="w-3 h-3 text-copper-400" />
                    <span>Location</span>
                  </div>
                  <p className="font-mono text-xs font-semibold text-foreground">
                    {contactDetails.location}
                  </p>
                  <p className="font-mono text-[10px] text-charcoal-400">
                    {contactDetails.coordinates}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-sandstone-400 font-mono text-[10px]">
                    <Clock className="w-3 h-3 text-copper-400" />
                    <span>Local Time</span>
                  </div>
                  <TimeDisplay showSeconds={true} className="text-xs" />
                  <p className="font-mono text-[10px] text-charcoal-400">
                    Asia/Kolkata (UTC+05:30)
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-charcoal-800 flex items-center gap-3">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="flex-1 p-2.5 rounded-lg border border-charcoal-700 hover:border-cyanAccent/50 bg-charcoal-900/50 text-center font-mono text-xs text-sandstone-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex-1 p-2.5 rounded-lg border border-charcoal-700 hover:border-cyanAccent/50 bg-charcoal-900/50 text-center font-mono text-xs text-sandstone-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Accessible Form */}
        <div className="lg:col-span-7">
          <Reveal direction="fade-left" delay={0.25}>
            <div className="chiseled-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-sandstone-500/20 relative">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Form Top Title */}
                <div className="border-b border-charcoal-800 pb-4">
                  <h3 className="text-xl font-display font-medium text-foreground">
                    {contactDetails.formTitle}
                  </h3>
                  <p className="text-xs text-charcoal-400 mt-0.5">
                    {contactDetails.formSubtitle}
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider text-sandstone-300"
                    >
                      Your Name / Entity <span className="text-copper-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Maya Patel / Studio"
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-lg bg-obsidian-950 border font-mono text-xs text-foreground placeholder:text-charcoal-500 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-charcoal-700 focus:border-cyanAccent/70'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider text-sandstone-300"
                    >
                      Return Coordinates (Email) <span className="text-copper-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maya@example.com"
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-lg bg-obsidian-950 border font-mono text-xs text-foreground placeholder:text-charcoal-500 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-charcoal-700 focus:border-cyanAccent/70'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs uppercase tracking-wider text-sandstone-300"
                  >
                    Inquiry Subject <span className="text-copper-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="New Platform Architecture / Creative Web Collaboration"
                    aria-required="true"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg bg-obsidian-950 border font-mono text-xs text-foreground placeholder:text-charcoal-500 focus:outline-none transition-colors ${
                      errors.subject
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-charcoal-700 focus:border-cyanAccent/70'
                    }`}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-sandstone-300"
                  >
                    Blueprint Details & Timeline <span className="text-copper-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision, technical requirements, timeline, and goals..."
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg bg-obsidian-950 border font-mono text-xs text-foreground placeholder:text-charcoal-500 focus:outline-none transition-colors resize-y ${
                      errors.message
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-charcoal-700 focus:border-cyanAccent/70'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="font-mono text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-copper-900/30 border border-copper-400/50 text-xs font-mono text-cyanAccent space-y-1"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Check className="w-4 h-4 text-cyanAccent" />
                      <span>Signal Dispatched Successfully</span>
                    </div>
                    <p className="text-sandstone-300">
                      Thank you for reaching out. The atelier has received your signal; expect a response within 24–48 hours.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Transmission failed. Please reach out directly to {profileData.email}.</span>
                  </div>
                )}

                {/* Submission CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="font-mono text-[10px] text-charcoal-500">
                    * Wire easily to Resend / Formspree or Next.js Server Action in production.
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={status === 'loading'}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Dispatch Signal
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
      </div>
    </section>
  );
}
