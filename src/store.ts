import { atom, computed } from 'nanostores';

// 用户状态管理示例
export const isMenuOpen = atom(false);

export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}

// 主题管理
export type Theme = 'light' | 'dark';

// 从本地或系统默认读取初始值
const getInitialTheme = (): Theme => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as Theme;
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const theme = atom<Theme>(getInitialTheme());
export const isDark = computed(theme, (value) => value === 'dark');

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', newTheme);
  }
  if (typeof document !== 'undefined') {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

export function toggleTheme() {
  const currentTheme = theme.get();
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

// 会话随机种子：用于锚定英雄图且避免每次刷新都一样
// 在 ClientRouter 下，导航不会重置此状态
export const visitKey = atom(Math.random().toString(36).substring(7));

/**
 * 根据文章 ID/Slug 生成一个确定性的随机索引
 * 确保同一篇文章在首页、列表页、详情页的图片偏移量完全一致
 */
export function getPostSeed(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % 1000;
}
