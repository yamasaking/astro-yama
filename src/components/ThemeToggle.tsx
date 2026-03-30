import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { theme, toggleTheme, setTheme } from '../store';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const $theme = useStore(theme);

  // 确保在 ClientRouter 下组件重新挂载时，DOM 类名依然正确（作为兜底）
  useEffect(() => {
    if ($theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [$theme]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative flex items-center justify-center overflow-hidden"
      aria-label="切换主题"
    >
      <AnimatePresence mode="wait" initial={false}>
        {$theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon size={20} className="text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun size={20} className="text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
