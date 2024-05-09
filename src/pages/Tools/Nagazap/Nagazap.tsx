import React, { useEffect, useState } from "react"
import { Box, Paper } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { Title } from "../Wakeup"
import { WhatsApp } from "@mui/icons-material"
import { ToolButton } from "./ToolButton"
import { Route, Routes } from "react-router-dom"
import { Token } from "./Token"
import { Nagazap } from "../../../types/server/class/Nagazap"
import { api } from "../../../api"
import { Info } from "./Info"
import { MessagesScreen } from "./Messages/Messages"
import { Oven } from "./Oven/Oven"
import { MessageFormScreen } from "./MessageForm"
import { Blacklist } from "./Blacklist/Blacklist"

interface NagazapProps {
    user: User
}

export const NagazapScreen: React.FC<NagazapProps> = ({ user }) => {
    const [nagazap, setNagazap] = useState<Nagazap>()
    const [loading, setLoading] = useState(false)

    const refreshNagazap = async () => {
        setLoading(true)

        try {
            const response = await api.get("/whatsapp")
            setNagazap(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshNagazap()
    }, [])

    return (
        <Box sx={{ ...backgroundStyle, padding: "2vw", paddingBottom: "8vw", flexDirection: "row" }}>
            <Paper
                sx={{
                    width: "17vw",
                    height: "100%",
                    bgcolor: "background.paper",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "1vw 0",
                    gap: "1.5vw",
                    borderRadius: "0 0 0 2vw ",
                    color: "secondary.main",
                    overflowX: "hidden",
                    // hiding scrollbar
                    "&::-webkit-scrollbar": {
                        width: 0,
                        height: 0,
                    },
                }}
                elevation={5}
            >
                <Title title="Nagazap" icon={<WhatsApp />}>
                    <ToolButton label="Informações" route="/" />
                    <ToolButton label="Token" route="/token" />
                    <ToolButton label="Mensagens" route="/messages" />
                    <ToolButton label="Forno" route="/oven" />
                    <ToolButton label="Enviar mensagem" route="/message_form" />
                    <ToolButton label="Lista negra" route="/blacklist" />
                </Title>
            </Paper>
            <Box sx={{ width: "80vw" }}>
                <Routes>
                    <Route index element={<Info />} />
                    <Route path="/token" element={<Token nagazap={nagazap} setNagazap={setNagazap} />} />
                    <Route path="/messages" element={<MessagesScreen />} />
                    <Route path="/oven" element={<Oven nagazap={nagazap} setNagazap={setNagazap} />} />
                    <Route path="/blacklist" element={<Blacklist nagazap={nagazap} setNagazap={setNagazap} />} />
                    <Route path="/message_form" element={<MessageFormScreen />} />
                </Routes>
            </Box>
        </Box>
    )
}
