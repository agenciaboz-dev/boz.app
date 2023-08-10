import React from 'react'
import { Box } from "@mui/material"
import { Header } from "../components/Header"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Box sx={{ flexDirection: "column", width: "100%", height: "100vh", backgroundColor: "background.default" }}>
            <Header user={user} />
        </Box>
    )
}