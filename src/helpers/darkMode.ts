const storageKey = 'dark-mode';

export const darkModeStorage = {
  getIsDark: () => {
    return JSON.parse(localStorage.getItem(storageKey) || 'false');
  },
  setIsDark: (isDark: boolean) => {
    localStorage.setItem(storageKey, JSON.stringify(isDark));
  },
  clearIsDark: () => {
    localStorage.removeItem(storageKey);
  },
};

export default darkModeStorage;
