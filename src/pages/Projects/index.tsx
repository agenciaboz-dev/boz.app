import React from "react"
import { Box, IconButton, Paper, Tooltip, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { Title } from "../Tools/Wakeup"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Add } from "@mui/icons-material"
import { NewProject } from "./NewProject"

interface ProjectsProps {
    user: User
}

export const Projects: React.FC<ProjectsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ padding: "2vw", width: "100%", height: "90%" }}>
                <Paper
                    sx={{
                        width: isMobile ? "100%" : "17vw",
                        height: isMobile ? "30vh" : "100%",
                        bgcolor: "background.paper",
                        flexDirection: "column",
                        overflowY: "auto",
                        padding: "1vw 0",
                        alignItems: "center",
                        gap: isMobile ? "5vw" : "1.5vw",
                        borderRadius: isMobile ? "0 2vw 0 0" : "0 0 0 2vw ",
                        color: "secondary.main",
                        overflowX: "hidden",
                    }}
                    elevation={4}
                >
                    <Title title="Projetos">
                        <Box sx={{ padding: "0 0.5vw", justifyContent: "center" }}>
                            <Tooltip title="New API" dir="top">
                                <IconButton sx={{ justifyContent: "flex-end" }} onClick={() => navigate("/projects/new/")}>
                                    <Add color="secondary" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        {/* {list
                        .sort((a, b) => a.id - b.id)
                        .map((api) => (
                            <ApiContainer api={api} key={api.id} />
                        ))} */}
                    </Title>
                </Paper>
                <Box sx={{ width: isMobile ? "100%" : "80vw" }}>
                    <Routes>
                        <Route index element={<></>} />
                        <Route path="/new" element={<NewProject user={user} />} />
                        {/* <Route path="/api/:id/*" element={<ApiPage user={user} />} /> */}
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
