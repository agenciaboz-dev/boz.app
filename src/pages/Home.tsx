import React from 'react'
import { Box } from "@mui/material"
import { Header } from "../components/Header"
import { backgroundStyle } from "../style/background"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
        </Box>
    )
}