import React from "react"
import { Box, Switch } from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useDarkMode } from "../hooks/useDarkMode"

interface ModeTogglerProps {}

export const ModeToggler: React.FC<ModeTogglerProps> = ({}) => {
    const { darkMode, toogleDarkMode } = useDarkMode()

    return (
        <Box sx={{ marginTop: "auto", position: "absolute", alignItems: "center", padding: "1vw", top: "0", right: "0" }}>
            <LightModeIcon color={darkMode ? "disabled" : "secondary"} />
            <Switch checked={darkMode} onChange={() => toogleDarkMode()} />
            <DarkModeIcon color={darkMode ? "secondary" : "disabled"} />
        </Box>
    )
}
