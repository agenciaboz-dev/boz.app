import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Grid, IconButton } from "@mui/material"
import { Subroute } from "../Subroute"
import { api } from "../../../../api"
import { NagaMessage } from "../../../../types/server/class/Nagazap"
import { MessageContainer } from "./MessageContainer"
import { Refresh } from "@mui/icons-material"
import { useIo } from "../../../../hooks/useIo"
import { useSearch } from "../../../../hooks/useSearch"

interface MessagesScreenProps {}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({}) => {
    const io = useIo()
    const { setOnSearch } = useSearch()

    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<NagaMessage[]>([])
    const [filteredMessages, setFilteredMessages] = useState<NagaMessage[]>(messages)

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

    const onSearch = (value: string) => {
        const text = value.toLowerCase()
        const filtered = messages.filter(
            (message) => message.from.includes(text) || message.name.toLowerCase().includes(text) || message.text.toLowerCase().includes(text)
        )
        console.log(filtered)
        setFilteredMessages(filtered)
    }

    useEffect(() => {
        setOnSearch(() => onSearch, "mensagens")
        fetchMessages()

        io.on("nagazap:message", (message) => {
            setMessages((messages) => [...messages, message])
        })

        return () => {
            io.off("nagazap:message")
        }
    }, [])

    useEffect(() => {
        setFilteredMessages(messages)
    }, [messages])

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
                {filteredMessages
                    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                    .map((item) => (
                        <MessageContainer key={item.id} message={item} />
                    ))}
            </Grid>
        </Subroute>
    )
}
