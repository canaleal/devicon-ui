import { useEffect, useState } from 'react';
import { darkModeStorage } from '../../helpers/darkMode';

function DarkLightToggle() {
  const [darkMode, setDarkMode] = useState(darkModeStorage.getIsDark());

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
    darkModeStorage.setIsDark(newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="z-50 fixed top-0 right-0 mt-8 mr-8 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
    >
      {darkMode ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  );
}

export default DarkLightToggle;
