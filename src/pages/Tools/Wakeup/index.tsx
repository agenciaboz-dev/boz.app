import React, { useState } from "react"
import { Box, Button, MenuItem, Paper } from "@mui/material"
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

export const Wakeup: React.FC<WakeupProps> = ({ user }) => {
    const { list } = useWakeup()
    const colors = useColors()
    const navigate = useNavigate()

    return (
        <Box sx={{ color: colors.text.secondary, padding: "2vw", justifyContent: "space-between" }}>
            <Paper sx={{ width: "15vw", height: "80vh", bgcolor: "background.default", flexDirection: "column" }}>
                <Button
                    endIcon={<Add />}
                    variant="contained"
                    sx={{ color: "background.default", fontWeight: "bold", marginBottom: "1vw" }}
                    onClick={() => navigate("/tools/wakeup/new")}
                ></Button>
                {list
                    .sort((a, b) => a.id - b.id)
                    .map((api) => (
                        <ApiContainer api={api} key={api.id} />
                    ))}
            </Paper>
            <Box sx={{ padding: "", width: "80vw" }}>
                <Routes>
                    <Route index element={<></>} />
                    <Route path="/new" element={<NewApi user={user} />} />
                    <Route path="/api/:id" element={<ApiPage user={user} />} />
                </Routes>
            </Box>
        </Box>
    )
}
