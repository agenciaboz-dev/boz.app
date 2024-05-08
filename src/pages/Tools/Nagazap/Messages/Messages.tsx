import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Grid, IconButton } from "@mui/material"
import { Subroute } from "../Subroute"
import { api } from "../../../../api"
import { NagaMessage } from "../../../../types/server/class/Nagazap"
import { MessageContainer } from "./MessageContainer"
import { Refresh } from "@mui/icons-material"
import { useIo } from "../../../../hooks/useIo"

interface MessagesScreenProps {}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({}) => {
    const io = useIo()

    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<NagaMessage[]>([])

    const fetchMessages = async () => {
        setLoading(true)

        try {
            const response = await api.get("/whatsapp/messages")
            console.log(response.data)
            setMessages(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()

        io.on("nagazap:message", (message) => {
            setMessages((messages) => [...messages, message])
        })

        return () => {
            io.off("nagazap:message")
        }
    }, [])

    return (
        <Subroute
            title="Mensagens"
            right={
                <IconButton onClick={fetchMessages} disabled={loading}>
                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : <Refresh />}
                </IconButton>
            }
        >
            <Grid container columns={1} spacing={2}>
                {messages
                    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                    .map((item) => (
                        <MessageContainer key={item.id} message={item} />
                    ))}
            </Grid>
        </Subroute>
    )
}
