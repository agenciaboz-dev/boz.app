import React from 'react'
import { Box, Paper } from "@mui/material"
import { Header } from "../components/Header"
import { useDarkMode } from "../hooks/useDarkMode"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    const { darkMode } = useDarkMode()

    return (
        <Paper sx={{ flexDirection: "column", width: "100%", height: "100vh" }}>
            <Header user={user} />
        </Paper>
    )
}