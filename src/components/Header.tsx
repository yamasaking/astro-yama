import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FileText, Users, Info, Gamepad2, Moon, Sun, Menu, X } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { isMenuOpen, toggleMenu, isDark, toggleTheme } from '../store';

const NAV_LINKS = [
  { name: '首页', href: '/', icon: <Home size={18} /> },
  { name: '文章', href: '/posts', icon: <FileText size={18} /> },
  { name: '友链', href: '/friends', icon: <Users size={18} /> },
  { name: '关于', href: '/about', icon: <Info size={18} /> },
  { name: '游戏', href: '/games', icon: <Gamepad2 size={18} /> },
];

export default function Header({ pathname = '/' }: { pathname?: string }) {
  const $isMenuOpen = useStore(isMenuOpen);
  const $isDark = useStore(isDark);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  // 规范化路径：去除末尾斜杠，确保 SSR 和 Client 匹配
  const normalizePath = (path: string) => {
    if (path === '/') return path;
    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
    
    let timeoutId: number;
    const handleScroll = () => {
      setIsVisible(false);
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const isActive = (href: string) => {
    // 在挂载前使用预设的 pathname 匹配，挂载后使用真实的 currentPath
    const target = normalizePath(href);
    const current = normalizePath(currentPath);
    
    if (target === '/' && current === '/') return true;
    if (target !== '/' && current.startsWith(target)) return true;
    return false;
  };

  // 这里的渲染逻辑必须保证初次渲染（Hydration）与 SSR 完全一致
  // 我们通过让 isActive 逻辑对齐，以及在 mounted 之后才开启动态状态同步
  
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={false} // 禁用初始动画以减少 Hydration 冲突
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20 
        }}
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-2xl shadow-black/5"
      >
        {/* Logo */}
        <a 
          href="/" 
          className={`p-2 mr-2 rounded-full transition-all duration-300 hover:rotate-12 ${
            isActive('/') 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 rotate-0' 
            : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
          }`}
        >
          <Home size={18} />
        </a>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.slice(1).map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  active 
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="mx-2 h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

        {/* 工具栏 */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {$isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {$isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* 移动端抽屉 */}
        <AnimatePresence>
          {$isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-16 left-0 right-0 p-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl shadow-xl md:hidden"
            >
              <div className="grid grid-cols-2 gap-2 p-2">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 font-medium ${
                        active 
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/40' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span className={`p-2 rounded-xl transition-colors ${
                        active ? 'bg-blue-100 dark:bg-blue-800' : 'bg-zinc-50 dark:bg-zinc-900'
                      }`}>
                        {link.icon}
                      </span>
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
