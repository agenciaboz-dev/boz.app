import React, { useEffect, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { useZap } from "../../hooks/useZap"
import { QrCode } from "./QrCode"
import { useIo } from "../../hooks/useIo"
import { Chats } from "./Chats"

interface ZapProps {
    user: User
}

export const Zap: React.FC<ZapProps> = ({ user }) => {
    const io = useIo()
    const { client, qrcode } = useZap()

    const [chats, setChats] = useState<Chat[]>([])

    const handleSearch = (value: string) => {
        if (client) {
            const result = client.chats.filter((chat) => chat.name.toLowerCase().includes(value.toLowerCase()))
            setChats(result)
        }
    }

    useEffect(() => {
        if (client?.chats) {
            setChats(client.chats)
        }
    }, [client?.chats])

    useEffect(() => {
        io.emit("zap:sync")
        console.log(!!qrcode)
    }, [])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} onSearch={handleSearch} />
            {client?.connected ? (
                <Box sx={{ flexDirection: "column", padding: "2vw", height: "90vh", overflowY: "auto", gap: "1vw", color: "primary.main" }}>
                    <p style={{ fontWeight: "bold" }}>{client.info.pushname}</p>
                    {chats && <Chats chats={chats} />}
                </Box>
            ) : (
                <QrCode qrcode={qrcode} />
            )}
        </Box>
    )
}
