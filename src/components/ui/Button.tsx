'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'sandstone';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}: ButtonProps) {
  const { playClick, playHover } = useAudioEffect();

  const baseStyles =
    'inline-flex items-center justify-center font-mono font-medium transition-all duration-300 relative group overflow-hidden select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-md text-center';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs md:text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm md:text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-copper-700/30 hover:bg-copper-600/40 text-cyanAccent hover:text-white border border-copper-400/40 hover:border-cyanAccent/60 shadow-lg shadow-copper-950/40 hover:shadow-cyanAccent/10',
    secondary:
      'bg-charcoal-800/80 hover:bg-charcoal-700/80 text-foreground border border-charcoal-600 hover:border-sandstone-400/50',
    sandstone:
      'bg-sandstone-900/30 hover:bg-sandstone-800/40 text-sandstone-200 border border-sandstone-500/40 hover:border-sandstone-400 hover:text-white',
    ghost:
      'text-sandstone-300 hover:text-cyanAccent hover:bg-charcoal-800/40 border border-transparent',
    outline:
      'border border-sandstone-500/30 text-sandstone-300 hover:text-white hover:border-copper-400 hover:bg-copper-900/20',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    playClick();
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        leftIcon && <span className="transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="transition-transform group-hover:translate-x-0.5">{rightIcon}</span>
      )}
      
      {/* Subtle bottom edge highlight */}
      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyanAccent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
          onClick={handleClick}
          onMouseEnter={playHover}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        onClick={handleClick}
        onMouseEnter={playHover}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      onMouseEnter={playHover}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
}
