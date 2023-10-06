import { useState, useEffect } from 'react';

function DarkLightToggle() {
    const [darkMode, setDarkMode] = useState(false);

    // On component mount, check for the theme preference in localStorage
    useEffect(() => {
        const isDark = localStorage.getItem('dark-mode');
        if (isDark !== null) {
            setDarkMode(isDark === 'true');
        }
    }, []);

    // Whenever darkMode state changes, store it in localStorage
    useEffect(() => {
        localStorage.setItem('dark-mode', darkMode.toString());
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (

        <button
            onClick={() => setDarkMode(!darkMode)}
            className="z-50 fixed top-0 right-0 mt-8 mr-8 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
           {darkMode ? <i className="fa-solid fa-sun"></i>   :  <i className="fa-solid fa-moon"></i>}
        </button>
    );
}

export default DarkLightToggle;
