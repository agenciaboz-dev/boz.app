import React, { useState } from "react"
import { Box, Button, MenuItem, Paper, useMediaQuery } from "@mui/material"
import { useWakeup } from "../../../hooks/useWakeup"
import { useColors } from "../../../hooks/useColors"
import { ApiContainer } from "./ApiContainer"
import { Add } from "@mui/icons-material"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NewApi } from "./NewApi"
import { ApiPage } from "./ApiPage"

interface WakeupProps {
    user: User
}

const Title: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", padding: isMobile ? "5vw 0" : "1vw 0" }}>
            <p style={{ textAlign: "center" }}>{title}</p>
            <Box sx={{ flexDirection: "column" }}>{children}</Box>
        </Box>
    )
}

export const Wakeup: React.FC<WakeupProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { list } = useWakeup()
    const colors = useColors()
    const navigate = useNavigate()

    const [electron] = useState(window.electron)

    return (
        <Box
            sx={{
                color: colors.text.secondary,
                padding: isMobile ? "8vw 5vw" : "2vw",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {electron ? (
                <>
                    <Paper
                        sx={{
                            width: isMobile ? "100%" : "15vw",
                            height: isMobile ? "30vh" : "80vh",
                            bgcolor: "background.default",
                            flexDirection: "column",
                            overflowY: "auto",
                        }}
                    >
                        <Title title="APIs">
                            <Button
                                endIcon={<Add />}
                                variant="contained"
                                onClick={() => navigate("/tools/wakeup/new")}
                                sx={{
                                    color: "background.default",
                                    fontWeight: "bold",
                                    margin: isMobile ? "2vw 5vw 5vw" : "0 1vw 1vw",
                                }}
                            ></Button>
                            {list
                                .sort((a, b) => a.id - b.id)
                                .map((api) => (
                                    <ApiContainer api={api} key={api.id} />
                                ))}
                        </Title>
                    </Paper>

                    <Box sx={{ width: isMobile ? "100%" : "80vw" }}>
                        <Routes>
                            <Route index element={<></>} />
                            <Route path="/new" element={<NewApi user={user} />} />
                            <Route path="/api/:id" element={<ApiPage user={user} />} />
                        </Routes>
                    </Box>
                </>
            ) : (
                <p>Essa ferramenta só está disponível através do APP</p>
            )}
        </Box>
    )
}
