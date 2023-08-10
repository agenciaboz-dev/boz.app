import { createTheme } from "@mui/material"
import { useDarkMode } from "./useDarkMode"
import { useMemo } from "react"
import { useColors } from "./useColors"

export const useMuiTheme = () => {
    const { darkMode } = useDarkMode()
    const colors = useColors()

    const THEME = useMemo(() => {
        console.log({ MuiDark: darkMode })

        return createTheme({
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
                    default: colors.backgroundDark,
                    paper: colors.backgroundDark,
                },

                text: {
                    primary: colors.text.primary,
                },
            },
        })
    }, [darkMode])

    return THEME
}
