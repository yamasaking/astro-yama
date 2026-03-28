import { atom, computed } from 'nanostores';

// 用户状态管理示例
export const isMenuOpen = atom(false);

export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}

// 主题管理
export type Theme = 'light' | 'dark';
export const theme = atom<Theme>('light');
export const isDark = computed(theme, (value) => value === 'dark');

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', newTheme);
  }
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleTheme() {
  const currentTheme = theme.get();
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}
