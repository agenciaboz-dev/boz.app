import { useDarkMode } from "./useDarkMode"

export const useColors = () => {
    const { darkMode } = useDarkMode()

    return {
        primary: darkMode ? "#8CDCFE" : "#00AFEF",
        secondary: darkMode ? "#ffffff" : "#ffffff",
        terciary: darkMode ? "#D9D9D9" : "#1F1F1F",

        success: "#34A853",

        warning: darkMode ? "#ffa726" : "#ffb74d",

        background: {
            primary: darkMode ? "#1F1F1F" : "#ffffff",
            secondary: darkMode ? "#181818" : "#00AFEF",
        },

        text: {
            primary: darkMode ? "#8CDCFE" : "#00AFEF",
            secondary: darkMode ? "#D9D9D9" : "#1F1F1F",
            terciary: darkMode ? "#0078D4" : "#ffffff",
        },
    }
}
