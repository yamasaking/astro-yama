import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
const { 
  Code2, 
  Cpu, 
  Earth: Globe, 
  Zap, 
  Clock, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Bug, 
  CircleX: X, 
  Terminal: Github, 
  Share2: Twitter, 
  Mail 
} = Icons as any;

interface Post {
  id: string;
  data: {
    title: string;
    pubDate: Date;
  };
}

interface BentoGridProps {
  latestPosts: Post[];
}

export default function BentoGrid({ latestPosts }: BentoGridProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showIntro, setShowIntro] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group/bento" ref={containerRef}>
      <section className="max-w-6xl mx-auto px-6 pb-12 w-full relative">
        <div className="relative">
          {/* 为毛虫提供精准的网格边界：使用负 inset 创建一个略大于网格的“轨道” */}
          <div className="absolute inset-[-20px] pointer-events-none">
            {/* 边缘爬虫 Bug Crawler */}
            <BugCrawler onClick={() => setShowIntro(true)} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
          {/* 技术栈模块 */}
          <div className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-500/5 backdrop-blur-3xl rounded-[2rem] border border-blue-500/20 p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500 rounded-xl text-white">
                  <Cpu size={20} />
                </div>
                <h3 className="font-bold text-xl dark:text-zinc-100">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Astro', 'React', 'TS', 'Node', 'Tailwind', 'Framer'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded-full text-xs border border-zinc-200 dark:border-blue-500/20 shadow-sm transition-transform hover:scale-110 hover:border-blue-500/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Sparkles className="absolute -bottom-4 -right-4 text-blue-500/20 w-32 h-32 group-hover:rotate-12 transition-transform duration-700" />
          </div>

          {/* 状态/时钟模块 */}
          <div className="md:col-span-1 md:row-span-1 bg-zinc-900 dark:bg-zinc-900 rounded-[2rem] p-8 text-white flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Clock size={24} className="text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 font-mono text-xs">LOCATION</div>
                <div className="flex items-center gap-1 text-xs">
                  <MapPin size={10} /> SH, China
                </div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold tracking-tighter mb-1">
                {time}
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                正在编码中...
              </div>
            </div>
          </div>

          {/* 模拟终端模块 */}
          <div className="md:col-span-1 md:row-span-2 bg-zinc-100 dark:bg-zinc-900/40 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-6 font-mono text-sm overflow-hidden flex flex-col">
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="space-y-1.5 text-zinc-500 dark:text-zinc-400 scale-95 origin-top-left">
              <p className="text-blue-400">~ pnpm dev</p>
              <p className="text-zinc-600 dark:text-zinc-500">Synced content</p>
              <p className="text-zinc-600 dark:text-zinc-500">Types generated</p>
              <p className="text-blue-400">~ git status</p>
              <p>On main branch</p>
              <p className="animate-pulse">_</p>
            </div>
            <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-[10px] text-zinc-400 mb-1 font-sans">TOTAL COMMIT</div>
              <div className="text-xl font-bold dark:text-zinc-100 italic tracking-tighter leading-none">2.4k+</div>
            </div>
          </div>

          {/* 最新文章模块 */}
          <div className="md:col-span-2 md:row-span-1 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" />
                <h3 className="font-bold text-lg dark:text-zinc-100">Recent Posts</h3>
              </div>
              <a href="/posts" className="text-xs text-zinc-400 hover:text-blue-600 transition-colors">See all →</a>
            </div>
            <div className="space-y-3">
              {latestPosts.map((post) => (
                <a 
                  key={post.id} 
                  href={`/posts/${post.id}`}
                  className="flex items-center justify-between group/item p-2 -mx-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
                >
                  <span className="text-sm dark:text-zinc-300 group-hover/item:text-blue-600 transition-colors line-clamp-1">
                    {post.data.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {new Date(post.data.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1 md:row-span-1 bg-gradient-to-tr from-zinc-100 to-zinc-50 dark:from-zinc-800/50 dark:to-zinc-900/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all flex flex-col justify-center items-center text-center p-4 cursor-pointer group"
               onClick={() => setShowIntro(true)}>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xs dark:text-zinc-100">关于作者</span>
            <span className="text-[10px] text-zinc-400 mt-1">Introduction</span>
          </div>
          </div>
        </div>
      </section>

      {/* 介绍弹窗 Introduction Modal */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/40 backdrop-blur-md"
            onClick={() => setShowIntro(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 装饰背景 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <button 
                onClick={() => setShowIntro(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-6 text-3xl shadow-xl shadow-blue-500/30">
                  👨‍💻
                </div>
                <h2 className="text-3xl font-black mb-4 dark:text-zinc-100">你好，我是 Yama!</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  一名热爱构建优雅界面的全栈开发者。
                  在这个快节奏的数字时代，我热衷于折腾各种极客玩具。
                  这个网站是我用来记录技术思考与生活点滴的“飞船”。
                </p>

                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-blue-400 hover:text-white transition-all">
                    <Twitter size={20} />
                  </a>
                  <a href="mailto:hello@example.com" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-950 transition-all">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 边缘爬虫组件：毛虫形态
function BugCrawler({ onClick }: { onClick: () => void }) {
  // 路径逻辑：在容器四周边框循环
  // 顺时针：左上 -> 右上 -> 右下 -> 左下 -> 左上
  // 使用 9 个关键帧来确保在转角处有“停留转向”的时间，使其更自然
  return (
    <motion.div
      initial={{ left: '0%', top: '0%', rotate: 0 }}
      animate={{
        left: ['0%', '100%', '100%', '100%', '100%', '0%', '0%', '0%', '0%'],
        top: ['0%', '0%', '0%', '100%', '100%', '100%', '100%', '0%', '0%'],
        // 修正转向：0 -> 90 -> 180 -> 270 -> 360(即回到0)，全部顺时针
        rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360],
      }}
      transition={{
        duration: 35, // 悠闲的爬行速度
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.24, 0.26, 0.49, 0.51, 0.74, 0.76, 0.99, 1],
      }}
      onClick={onClick}
      className="absolute z-[60] w-10 h-6 flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
      style={{
        transform: 'translate(-50%, -50%)', // 使用 translate 代替 margin 确保中心点精准贴合每一边
      }}
    >
      {/* 绿色的毛虫设计 */}
      <div className="relative flex items-center gap-0.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
        {/* 尾部 */}
        <motion.div 
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
          className="w-2.5 h-2.5 bg-green-500 rounded-full" 
        />
        {/* 身体中部 */}
        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          className="w-3 h-3 bg-green-600 rounded-full" 
        />
        {/* 头部 */}
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center relative"
        >
          {/* 眼睛 */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-zinc-900 rounded-full" />
          {/* 触角 */}
          <div className="absolute -top-1 right-0 flex gap-1">
            <div className="w-[1px] h-1.5 bg-green-700 -rotate-12" />
            <div className="w-[1px] h-1.5 bg-green-700 rotate-12" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
