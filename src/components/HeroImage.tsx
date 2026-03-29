import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { visitKey, getPostSeed } from '../store';
import Skeleton from './Skeleton';

interface HeroImageProps {
  heroImage?: string;
  title: string;
  className?: string;
  postId?: string;
}

export default function HeroImage({ heroImage, title, className = "", postId = "" }: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  const $visitKey = useStore(visitKey);
  
  useEffect(() => {
    // 仅在客户端挂载后计算 URL，解决 SSR/CSR 水合冲突问题
    let finalUrl = heroImage;
    if (finalUrl?.includes('noome.cn/acgurl')) {
      const seed = getPostSeed(postId);
      finalUrl = `${finalUrl}?key=${$visitKey}${seed}`;
    }
    setImgSrc(finalUrl);

    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, [heroImage, $visitKey, postId]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {(!imageLoaded || !imgSrc) && (
          <motion.div 
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <Skeleton className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {imgSrc && (
        <img
          ref={imgRef}
          src={imgSrc}
          alt={title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
}
