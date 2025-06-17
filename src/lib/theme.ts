import { darkMode } from './stores';
import { get } from 'svelte/store';

export function initializeTheme() {
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  
  darkMode.set(isDark);
  updateTheme(isDark);
}

export function toggleTheme() {
  const currentTheme = get(darkMode);
  const newTheme = !currentTheme;
  
  darkMode.set(newTheme);
  updateTheme(newTheme);
  localStorage.setItem('theme', newTheme ? 'dark' : 'light');
}

function updateTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}