import React from "react"
import { Box, Paper } from "@mui/material"
import { Chat } from "./Chat"

interface ChatsProps {
    chats: Chat[]
}

export const Chats: React.FC<ChatsProps> = ({ chats }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
            {chats.map((chat) => (
                <Chat key={chat.id.user} chat={chat} />
            ))}
        </Box>
    )
}
