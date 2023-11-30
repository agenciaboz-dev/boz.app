import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { ThemeProvider } from "@mui/material"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import { DarkModeProvider } from "./contexts/darkModeContext"
import { ThemeProvider as CustomThemeProvider } from "./contexts/themeContext"
import { IoProvider } from "./contexts/ioContext"
import "@mantine/core/styles.css"

const Themed = () => {
    const theme = useMuiTheme()

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Providers>
                    <Routes />
                </Providers>
            </BrowserRouter>
        </ThemeProvider>
    )
}

const App = () => {
    Notification.requestPermission()
    
    return (
        <DarkModeProvider>
            <IoProvider>
                <CustomThemeProvider>
                    <Themed />
                </CustomThemeProvider>
            </IoProvider>
        </DarkModeProvider>
    )
}

export default App
