import React, {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            return saved ? saved === "dark" : true;
        }
        return true;
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    const toggleTheme = () => setDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{dark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
