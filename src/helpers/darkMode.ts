
export const getIsDarkModeFromLocalStorage = () => {
    const isDarkMode = localStorage.getItem('dark-mode');
    return isDarkMode ? true : false;
}

export const setIsDarkModeToLocalStorage = (isDarkMode: boolean) => {
    localStorage.setItem('dark-mode', String(isDarkMode));
}

