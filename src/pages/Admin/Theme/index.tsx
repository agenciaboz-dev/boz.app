import React from "react"
import { Box, IconButton, MenuItem, Paper } from "@mui/material"
import { useTheme } from "../../../hooks/useTheme"
import { List } from "./List"
import { Add } from "@mui/icons-material"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NewTheme } from "./NewTheme"
import PaletteIcon from "@mui/icons-material/Palette"
import { ThemePage } from "./ThemePage"

interface ThemesProps {
    user: User
}

export const Themes: React.FC<ThemesProps> = ({ user }) => {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Box sx={{ padding: "2vw", fontSize: "1.3rem", color: "primary.main", fontWeight: "bold" }}>
            <Paper sx={{ borderRadius: "0 3vw", flex: 1, bgcolor: "background.default", height: "80vh" }}>
                <Paper
                    sx={{
                        padding: "2vw 0",
                        flexDirection: "column",
                        width: "20%",
                        borderBottomLeftRadius: "3vw",
                        color: "secondary.main"
                    }}>
                    <Box sx={{ alignItems: "center", gap: "1vw", justifyContent: "center" }}>
                        <PaletteIcon />
                        Temas
                    </Box>
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => navigate("/admin/themes")}>
                        <Add />
                    </IconButton>
                    <List themes={theme.list} />
                </Paper>
                <Routes>
                    <Route index element={<NewTheme user={user} />} />
                    <Route path="/*" element={<ThemePage user={user} />} />
                </Routes>
            </Paper>
        </Box>
    )
}
