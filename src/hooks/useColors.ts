import { useDarkMode } from "./useDarkMode"

export const useColors = () => {
    const { darkMode } = useDarkMode()

    return {
        primary: darkMode ? "#0078D4" : "#6EC1E4",
        secondary: darkMode ? "#D9D9D9" : "#ffffff",
        background: darkMode ? "#1F1F1F" : "#ffffff",
        backgroundDark: darkMode ? "#181818" : "#ffffff",

        text: {
            primary: darkMode ? "#8CDCFE" : "#6EC1E4",
        },
    }
}
