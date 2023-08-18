import React from "react"
import { Box, Paper } from "@mui/material"
import { Chat } from "./Chat"
import { useMediaQuery } from "@mui/material"

interface ChatsProps {
    chats: Chat[]
    onChatClick: (chat: Chat) => void
}

export const Chats: React.FC<ChatsProps> = ({ chats, onChatClick }) => {
    const isMobile = useMediaQuery({orientation: "portrait"})

    return (
        <Box sx={{ flexDirection: "column", gap: "0.1vw", width: isMobile ? "100%" : "30%" }}>
            {chats
                .sort((a, b) => b.lastMessage?.timestamp - a.lastMessage?.timestamp)
                .map((chat) => (
                    <Chat key={chat.id.user} chat={chat} onChatClick={onChatClick} />
                ))}
        </Box>
    )
}
