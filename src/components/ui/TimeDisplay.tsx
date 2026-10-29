'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  showSeconds?: boolean;
  className?: string;
}

export default function TimeDisplay({ showSeconds = true, className = '' }: TimeDisplayProps) {
  const [timeStr, setTimeStr] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined,
          hour12: false,
        });
        setTimeStr(formatter.format(now));
      } catch {
        // Fallback
        const now = new Date();
        setTimeStr(now.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [showSeconds]);

  if (!mounted) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-xs text-sandstone-300 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-copper-400 animate-pulse" />
        <span>--:--:-- IST</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs text-sandstone-300 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanAccent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-copper-400"></span>
      </span>
      <span>{timeStr} IST</span>
    </span>
  );
}
