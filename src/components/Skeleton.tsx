import React from 'react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-zinc-700/30 to-transparent -translate-x-full animate-shimmer" />
    </div>
  );
}
