'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

export type RevealDirection = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'blur-in';

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  offset?: number;
}

const getVariants = (direction: RevealDirection, offset: number): Variants => {
  switch (direction) {
    case 'fade-up':
      return {
        hidden: { opacity: 0, y: offset, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
    case 'fade-down':
      return {
        hidden: { opacity: 0, y: -offset, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
    case 'fade-left':
      return {
        hidden: { opacity: 0, x: -offset, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
      };
    case 'fade-right':
      return {
        hidden: { opacity: 0, x: offset, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
      };
    case 'scale-up':
      return {
        hidden: { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      };
    case 'blur-in':
      return {
        hidden: { opacity: 0, filter: 'blur(12px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
      };
  }
};

export default function Reveal({
  children,
  direction = 'fade-up',
  delay = 0,
  duration = 0.65,
  className = '',
  once = false,
  offset = 32,
}: RevealProps) {
  const variants = getVariants(direction, offset);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px', amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth custom cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function RevealGroup({
  children,
  staggerDelay = 0.08,
  className = '',
  once = false,
}: RevealGroupProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px', amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  direction = 'fade-up',
  offset = 24,
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  offset?: number;
}) {
  const variants = getVariants(direction, offset);

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
      className={`inline-block flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
