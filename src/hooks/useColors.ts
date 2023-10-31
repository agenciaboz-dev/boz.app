import { useDarkMode } from "./useDarkMode"

export const useColors = () => {
    // const { darkMode } = useDarkMode()
    const darkMode = true

    return {
        primary: darkMode ? "#FF8C00" : "#00AFEF",
        secondary: darkMode ? "#ffbd5c" : "#ffffff",
        terciary: darkMode ? "#D9D9D9" : "#1F1F1F",

        success: "#34A853",

        warning: darkMode ? "#ffa726" : "#ffb74d",

        background: {
            primary: darkMode ? "#1F1F1F" : "#ffffff",
            secondary: darkMode ? "#181818" : "#00AFEF",
        },

        text: {
            primary: darkMode ? "#FF8C00" : "#00AFEF",
            secondary: darkMode ? "#D9D9D9" : "#1F1F1F",
            terciary: darkMode ? "#0078D4" : "#ffffff",
        },
    }
}
