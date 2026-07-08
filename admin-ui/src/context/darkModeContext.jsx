import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return stored === "true";
  // Default: selalu Light Mode di kunjungan pertama (belum pernah di-toggle user)
  return false;
};

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Terapkan/lepas class "dark" di <html> setiap kali state berubah,
  // supaya seluruh aplikasi (CSS variables di App.css) ikut berubah.
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
