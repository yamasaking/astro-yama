import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const { 
  Terminal: Github, 
  Share2: Twitter, 
  Mail,
  Languages
} = Icons as any;

type Language = 'zh' | 'en' | 'ja';
// ... (rest remains same)

const PROFILE_DATA = {
  zh: {
    title: '关于我',
    subtitle: '代码、设计与对技术的无限热爱。',
    bio: [
      '一个推崇极致效率与优雅代码的极客。',
      '我构建工具，而不仅仅是应用。对我而言，每一行逻辑都是通向数字世界深处的阶梯。',
      '热衷于探索前沿 Web 技术，追求在 Bento 风格中寻找数字生活的最优解。'
    ],
    motto: '“在二进制的荒原中，寻找美学与逻辑的奇点。”',
    contact: '联系我'
  },
  en: {
    title: 'About Me',
    subtitle: 'Code, Design, and Infinite Passion for Tech.',
    bio: [
      'A geek who advocates for ultimate efficiency and elegant code.',
      "I build tools, not just applications. To me, every line of logic is a step deeper into the digital void.",
      'Passionate about cutting-edge Web techs, seeking the optimal digital life within Bento aesthetics.'
    ],
    motto: '"Seeking the singularity of aesthetics and logic in the binary wasteland."',
    contact: 'Get in Touch'
  },
  ja: {
    title: '私について',
    subtitle: 'コード、デザイン、そして技術への無限の情熱。',
    bio: [
      '究極の効率とエレガントなコードを提唱するギーク。',
      '私はアプリを作るだけでなく、ツールを構築します。私にとって、論理の各行はデジタル世界への階段です。',
      '最先端のWeb技術に情熱を注ぎ、Bentoスタイルの最適解を追求しています。'
    ],
    motto: '「バイナリの荒野で、美学と論理の特異点を探して。」',
    contact: 'お問い合わせ'
  }
};

export default function AboutProfile() {
  const [lang, setLang] = useState<Language>('zh');

  const toggleLang = () => {
    const sequence: Language[] = ['zh', 'en', 'ja'];
    const nextIndex = (sequence.indexOf(lang) + 1) % sequence.length;
    setLang(sequence[nextIndex]);
  };

  const current = PROFILE_DATA[lang];

  return (
    <div className="flex flex-col md:flex-row gap-12 items-start">
      {/* 左侧：西格玛头像 */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/3 group"
      >
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <img 
            src="/images/profile.png" 
            alt="Sigma Man Portrait" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white font-bold text-xl tracking-wider">YAMA</h3>
            <p className="text-zinc-300 text-xs mt-1">THE ARCHITECT</p>
          </div>
        </div>
      </motion.div>

      {/* 右侧：自述与切换 */}
      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-center">
            <motion.span 
              key={lang + 'badge'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-full border border-blue-500/20 uppercase tracking-widest"
            >
              System Profile [{lang}]
            </motion.span>
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all active:scale-95 group"
            >
              <Languages size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xs font-medium uppercase">{lang}</span>
            </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {current.title}
            </h2>
            
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              {current.bio.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <p className="text-blue-500/80 italic font-medium border-l-2 border-blue-500/30 pl-4 py-2 bg-blue-500/5 rounded-r-lg">
              {current.motto}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 社交链接 */}
        <div className="pt-6 flex gap-4">
          <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
            <Github size={20} />
          </a>
          <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
