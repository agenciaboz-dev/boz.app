import React from 'react'
import {Box} from '@mui/material'

interface HomeProps {
    user: User
}

export const Home:React.FC<HomeProps> = ({ user }) => {
    
    return (
        <Box sx={{}}>
            {user.name}
        </Box>
    )
}