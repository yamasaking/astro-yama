import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './Skeleton';

interface PostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  heroImage?: string;
  url: string;
}

export default function PostCard({ title, description, pubDate, heroImage, url }: PostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const formattedDate = new Date(pubDate).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col md:flex-row gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
    >
      {/* 图片区域 */}
      <div className="md:w-64 h-44 shrink-0 relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div 
              key="skeleton"
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <Skeleton className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {heroImage && (
          <img
            ref={imgRef}
            src={heroImage}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        )}
      </div>

      {/* 内容区域 */}
      <div className="flex flex-col flex-1 justify-center py-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 mb-3 font-medium">
          <time dateTime={pubDate.toISOString()}>{formattedDate}</time>
          <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
          <span>博文</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          <a href={url}>{title}</a>
        </h2>
        
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2 text-sm md:text-base">
          {description}
        </p>
        
        <div className="mt-auto">
          <a href={url} className="inline-flex items-center gap-1.5 text-blue-600 font-bold group/link text-sm md:text-base">
            继续阅读
            <motion.span 
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
