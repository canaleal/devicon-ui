import { useEffect, useState } from 'react';
import storage from '../../helpers/storage';

const positions = {
  topLeft: 'top-8 left-8',
  topRight: 'top-8 right-8',
  bottomLeft: 'bottom-8 left-8',
  bottomRight: 'bottom-8 right-8',
}

export interface DarkModeProps {
  position: keyof typeof positions;
}

const DarkModeToggle = ({position}: DarkModeProps) => {
  const [darkMode, setDarkMode] = useState(storage.getToken()['isDark'] ?? false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const token = storage.getToken();
    storage.setToken(
      {
        ...token,
        isDark: newDarkMode,
      }
    );
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`z-50 fixed ${positions[position]} bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md`}
    >
      {darkMode ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  );
}

export default DarkModeToggle;
