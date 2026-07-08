import React, { useContext } from 'react'
import Logo from '../Elements/Logo'
import { ThemeContext } from '../../context/themeContext'
import { DarkModeContext } from '../../context/darkModeContext'
import { FiSun, FiMoon } from 'react-icons/fi'

function AuthLayout(props) {
    const { children, title } = props;
    const { theme } = useContext(ThemeContext);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <>
            <main className={`min-h-screen bg-special-mainBg flex justify-center items-center p-6 ${theme.name}`}>

                <div className="w-full max-w-sm">

                    {/* Logo, terpusat di atas form */}
                    <div className="flex justify-center mb-10">
                        <Logo />
                    </div>

                    {/* Page title */}
                    {title && (
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-defaultBlack">{title}</h2>
                        </div>
                    )}

                    {/* form children */}
                    {children}

                    {/* Dark / Light mode toggle - di bawah form login/register */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-02 hover:text-primary hover:bg-special-bg transition-colors"
                        >
                            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                    </div>

                </div>

            </main>
        </>
    );
}

export default AuthLayout
