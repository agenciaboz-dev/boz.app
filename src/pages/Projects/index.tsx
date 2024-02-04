import React from "react"
import { Box, IconButton, MenuItem, Paper, Tooltip, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { Title } from "../Tools/Wakeup"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Add } from "@mui/icons-material"
import { NewProject } from "./NewProject"
import { useProject } from "../../hooks/useProject"
import { ProjectButton } from "./ProjectButton"
import { ProjectPage } from "./ProjectPage"
import { useCustomers } from "../../hooks/useCustomers"
import { CustomerButton } from "./CustomerButton"
import { useUser } from "../../hooks/useUser"

interface ProjectsProps {
    user: User
}

export const Projects: React.FC<ProjectsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { customers } = useCustomers()
    const { isAdmin } = useUser()
    const list = customers.filter((item) => !!item.projects.length)

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
                        gap: isMobile ? "5vw" : "1.5vw",
                        borderRadius: isMobile ? "0 2vw 0 0" : "0 0 0 2vw ",
                        color: "secondary.main",
                        overflowX: "hidden",
                    }}
                    elevation={5}
                >
                    <Title title="Projetos">
                        {isAdmin() && (
                            <Tooltip title="novo projeto" dir="top">
                                <MenuItem onClick={() => navigate("/projects/new/")} sx={{ justifyContent: "center" }}>
                                    <Add color="secondary" sx={{ width: "1.5vw", height: "auto" }} />
                                </MenuItem>
                            </Tooltip>
                        )}
                        {list.map((customer) => (
                            <CustomerButton key={customer.id} customer={customer} />
                        ))}
                    </Title>
                </Paper>
                <Box sx={{ width: isMobile ? "100%" : "80vw" }}>
                    <Routes>
                        <Route index element={<></>} />
                        <Route path="/new" element={<NewProject user={user} />} />
                        <Route path="/:id/*" element={<ProjectPage user={user} />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}
