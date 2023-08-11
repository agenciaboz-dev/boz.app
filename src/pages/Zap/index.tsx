import React, { useEffect, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { useZap } from "../../hooks/useZap"
import { QrCode } from "./QrCode"
import { Chats } from "./Chats"
import { ChatsSkeletons } from "./ChatsSkeletons"
import { ZapDrawer } from "../../components/ZapDrawer"

interface ZapProps {
    user: User
}

export const Zap: React.FC<ZapProps> = ({ user }) => {
    const { client, qrcode, loading } = useZap()

    const [chats, setChats] = useState<Chat[]>([])
    const [currentChat, setCurrentChat] = useState<Chat>()

    const handleSearch = (value: string) => {
        if (client) {
            const result = client.chats.filter((chat) => chat.name.toLowerCase().includes(value.toLowerCase()))
            setChats(result)
        }
    }

    const handleChatClick = (chat: Chat) => {
        setCurrentChat(chat)
    }

    useEffect(() => {
        if (client?.chats) {
            setChats(client.chats)
        }
    }, [client?.chats])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} onSearch={handleSearch} />
            {client?.connected ? (
                <Box
                    sx={{
                        flexDirection: "column",
                        padding: "2vw",
                        height: "90vh",
                        overflowY: "auto",
                        gap: "1vw",
                        color: "primary.main",
                        "::-webkit-scrollbar-thumb": {
                            backgroundColor: "primary.main",
                        },
                    }}
                >
                    <p style={{ fontWeight: "bold" }}>{client.info.pushname}</p>
                    {loading ? <ChatsSkeletons /> : <Chats chats={chats} onChatClick={handleChatClick} />}
                    <ZapDrawer chat={currentChat} />
                </Box>
            ) : (
                <QrCode qrcode={qrcode} />
            )}
        </Box>
    )
}
