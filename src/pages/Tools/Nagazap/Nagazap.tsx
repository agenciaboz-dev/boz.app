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
        <Box sx={{ ...backgroundStyle, padding: "2vw", paddingBottom: "8vw", overflow: "hidden", flexDirection: "row" }}>
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
                    <ToolButton label="Info" route="/" />
                    <ToolButton label="Token" route="/token" />
                    <ToolButton label="Mensagens" route="/messages" />
                </Title>
            </Paper>
            <Box sx={{ width: "80vw" }}>
                <Routes>
                    <Route index element={<Info />} />
                    <Route path="/token" element={<Token nagazap={nagazap} setNagazap={setNagazap} />} />
                    <Route path="/messages" element={<MessagesScreen />} />
                </Routes>
            </Box>
        </Box>
    )
}
