import { createContext, useEffect, useState } from "react"
import React from "react"
import { useDarkMode } from "../hooks/useDarkMode"

interface ThemeContextValue {
    colors: {
        primary: string
        secondary: string
        terciary: string
        success: string
        warning: string
        background: {
            primary: string
            secondary: string
        }
        text: {
            primary: string
            secondary: string
            terciary: string
        }
    }
}

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

export default ThemeContext

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const { darkMode } = useDarkMode()

    const default_colors = {
        primary: darkMode ? "#8CDCFE" : "#00AFEF",
        secondary: darkMode ? "#ffffff" : "#ffffff",
        terciary: darkMode ? "#D9D9D9" : "#1F1F1F",

        success: "#34A853",

        warning: darkMode ? "#ffa726" : "#ffb74d",

        background: {
            primary: darkMode ? "#1F1F1F" : "#ffffff",
            secondary: darkMode ? "#181818" : "#00AFEF"
        },

        text: {
            primary: darkMode ? "#8CDCFE" : "#00AFEF",
            secondary: darkMode ? "#D9D9D9" : "#1F1F1F",
            terciary: darkMode ? "#0078D4" : "#ffffff"
        }
    }

    const [colors, setColors] = useState(default_colors)

    useEffect(() => {
        setColors(default_colors)
    }, [darkMode])

    return <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
}
