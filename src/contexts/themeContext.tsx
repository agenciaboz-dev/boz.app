import { createContext, useEffect, useState } from "react"
import React from "react"
import { useDarkMode } from "../hooks/useDarkMode"
import { useIo } from "../hooks/useIo"

interface ThemeContextValue {
    list: Theme[]
    setList: React.Dispatch<React.SetStateAction<Theme[]>>
    current_theme: Theme
    colors: Theme
    darkColors: Theme
    setColors: React.Dispatch<React.SetStateAction<Theme>>
    setDarkColors: React.Dispatch<React.SetStateAction<Theme>>
}

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

export default ThemeContext

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const io = useIo()
    const { darkMode } = useDarkMode()

    const default_colors: Theme = {
        id: 1,
        name: "default_light",
        timestamp: "",
        primary: "#00AFEF",
        secondary: "#ffffff",
        terciary: "#1F1F1F",

        success: "#34A853",

        warning: "#ffb74d",

        background: {
            primary: "#ffffff",
            secondary: "#00AFEF"
        },

        text: {
            primary: "#00AFEF",
            secondary: "#1F1F1F",
            terciary: "#ffffff"
        }
    }

    const default_dark_colors: Theme = {
        id: 2,
        name: "default_dark",
        timestamp: "",
        primary: "#8CDCFE",
        secondary: "#ffffff",
        terciary: "#D9D9D9",
        success: "#34A853",
        warning: "#ffa726",
        background: {
            primary: "#1F1F1F",
            secondary: "#181818"
        },
        text: {
            primary: "#8CDCFE",
            secondary: "#D9D9D9",
            terciary: "#0078D4"
        }
    }

    const [colors, setColors] = useState<Theme>(default_colors)
    const [darkColors, setDarkColors] = useState<Theme>(default_dark_colors)

    const [current_theme, setCurrentTheme] = useState<Theme>(darkMode ? darkColors : colors)

    const [list, setList] = useState<Theme[]>([])

    const translateTheme = (theme: ThemeDB) => ({
        ...theme,
        background: { primary: theme.background_primary, secondary: theme.background_secondary },
        text: { primary: theme.text_primary, secondary: theme.text_secondary, terciary: theme.text_terciary }
    })

    useEffect(() => {
        setCurrentTheme(darkMode ? darkColors : colors)
    }, [darkMode, colors, darkColors])

    useEffect(() => {
        // io.on("theme:new", (theme: ThemeDB) => setList((prev) => [...prev.filter(item => item.id != theme.id), translateTheme(theme)]))
        // io.on("theme:activate", (theme: ThemeDB) => {
        //     setColors(translateTheme(theme))
        //     setDarkColors(translateTheme(theme))
        // })
        // io.on("theme:deactivate", () => {
        //     setColors(default_colors)
        //     setDarkColors(default_dark_colors)
        // })
        // return () => {
        //     io.off("theme:new")
        //     io.off("theme:activate")
        //     io.off("theme:deactivate")
        // }
    }, [list])

    useEffect(() => {
        // io.on("theme:list", (data: ThemeDB[]) => setList(data.map((theme) => translateTheme(theme))))
        // return () => {
        //     io.off("theme:list")
        // }
    }, [])

    return (
        <ThemeContext.Provider value={{ current_theme, colors, setColors, darkColors, setDarkColors, list, setList }}>
            {children}
        </ThemeContext.Provider>
    )
}
