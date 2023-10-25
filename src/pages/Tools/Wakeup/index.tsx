import React, { useState } from "react"
import { Box, Button, IconButton, MenuItem, Paper, SxProps, Tooltip, useMediaQuery } from "@mui/material"
import { useWakeup } from "../../../hooks/useWakeup"
import { useColors } from "../../../hooks/useColors"
import { ApiContainer } from "./ApiContainer"
import { Add } from "@mui/icons-material"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NewApi } from "./NewApi"
import { ApiPage } from "./ApiPage"
import { backgroundStyle } from "../../../style/background"
import ApiIcon from "@mui/icons-material/Api"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { useUser } from "../../../hooks/useUser"
interface WakeupProps {
    user: User
}

const Title: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", padding: isMobile ? "5vw 0" : "1vw 0" }}>
            <Box sx={{ alignItems: "center", justifyContent: "center", gap: "0.5vw" }}>
                <ApiIcon />
                <p style={{ textAlign: "center", fontWeight: "800", fontSize: "1.2vw" }}>{title}</p>
            </Box>
            <Box sx={{ flexDirection: "column" }}>{children}</Box>
        </Box>
    )
}

export const Wakeup: React.FC<WakeupProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { list } = useWakeup()
    const colors = useColors()
    const navigate = useNavigate()
    const { isRole } = useUser()

    const [electron] = useState(window.electron)

    const noAccessStyle:SxProps = { gap: "0.5vw", padding: "2vw", alignItems: "center", height: "min-content" }

    return (
        <Box sx={{ ...backgroundStyle, height: isMobile ? "auto" : electron ? "90vh" : "10vw" }}>
            <Box sx={{ padding: isMobile ? "5vw" : "2vw", height: isMobile ? "auto" : "100%" }}>
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "background.default",
                        borderRadius: "0 3vw 0",
                        position: "relative",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    <Box
                        sx={{
                            color: colors.text.secondary,
                            padding: isMobile ? "8vw 5vw" : electron ? "0vw" : "2.5vw",
                            justifyContent: "space-between",
                            flexDirection: isMobile ? "column" : "row",
                            gap: isMobile ? "5vw" : "",
                        }}
                    >
                        {electron ? (
                            isRole("dev") ? (
                                <>
                                    <Paper
                                        sx={{
                                            width: isMobile ? "100%" : "17vw",
                                            height: isMobile ? "30vh" : "100%",
                                            bgcolor: "background.paper",
                                            flexDirection: "column",
                                            overflowY: "auto",
                                            padding: "1vw 3vw",
                                            alignItems: "center",
                                            gap: isMobile ? "5vw" : "1.5vw",
                                            borderRadius: isMobile ? "0 2vw 0 0" : "0 0 0 2vw ",
                                            color: "secondary.main",
                                        }}
                                        elevation={4}
                                    >
                                        <Title title="APIs">
                                            <Box sx={{ padding: "0 0.5vw", justifyContent: "flex-end" }}>
                                                <Tooltip title="New API" dir="top">
                                                    <IconButton sx={{ justifyContent: "flex-end" }} onClick={() => navigate("/tools/wakeup/new")}>
                                                        <Add color="secondary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
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
                                            <Route path="/api/:id/*" element={<ApiPage user={user} />} />
                                        </Routes>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={noAccessStyle}>
                                    <ErrorOutlineIcon color="primary" />
                                    <p>Essa ferramenta só está disponível para desenvolvedores.</p>
                                </Box>
                            )
                        ) : (
                            <Box sx={noAccessStyle}>
                                <ErrorOutlineIcon color="primary" />
                                <p>Essa ferramenta só está disponível através do APP.</p>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
