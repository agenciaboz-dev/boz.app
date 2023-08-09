import React from 'react'
import {Box} from '@mui/material'
import { Header } from "../components/Header"

interface HomeProps {
    user: User
}

export const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <Box sx={{ flexDirection: "column" }}>
            <Header user={user} />
        </Box>
    )
}