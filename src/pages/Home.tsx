import React from 'react'
import { Paper } from "@mui/material"
import { Header } from "../components/Header"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Paper sx={{ flexDirection: "column", width: "100%", height: "100vh", backgroundColor: "background.default" }}>
            <Header user={user} />
        </Paper>
    )
}