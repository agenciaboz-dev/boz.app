import { createTheme } from "@mui/material"
import { useDarkMode } from "./useDarkMode"
// import { useMemo } from "react"
import { useColors } from "./useColors"

export const useMuiTheme = () => {
    const { darkMode } = useDarkMode()
    const colors = useColors()

    const THEME = createTheme({
        typography: {
            fontFamily: ["Montserrat"].join(","),
        },
        palette: {
            mode: darkMode ? "dark" : "light",

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },

            background: {
                default: colors.background.primary,
                paper: colors.background.secondary,
            },

            text: {
                primary: colors.text.primary,
                secondary: colors.text.secondary,
            },

            success: {
                main: colors.success,
            },

            warning: {
                main: colors.warning,
            },
        },
    })

    return THEME
}
