import React from "react"
import { Box, Paper } from "@mui/material"

interface ChatProps {
    chat: Chat
}

export const Chat: React.FC<ChatProps> = ({ chat }) => {
    return (
        <Paper sx={{ padding: "2vw", backgroundColor: "background.default" }}>
            <p>{chat.name}</p>
        </Paper>
    )
}
