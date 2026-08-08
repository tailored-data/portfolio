import { useCallback, useEffect, useState } from 'react';

const themeStorageKey = 'portfolioTheme';

/**
 * Owns the light/dark state.
 *
 * The theme lives as a `data-theme` attribute on <html>, not in React state
 * that components read. That means the entire re-theme is a single attribute
 * write and the CSS cascade does the rest — React never re-renders a single
 * component to change colors.
 *
 * The initial value is read back off the DOM because the inline script in
 * index.html already resolved it before first paint.
 */
export function useThemeController() {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    try {
      window.localStorage.setItem(themeStorageKey, activeTheme);
    } catch (error) {
      // Private browsing can block storage; the theme still applies for
      // this session, it just won't be remembered.
    }
  }, [activeTheme]);

  const toggleTheme = useCallback(() => {
    setActiveTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return { activeTheme, toggleTheme, isDarkTheme: activeTheme === 'dark' };
}
