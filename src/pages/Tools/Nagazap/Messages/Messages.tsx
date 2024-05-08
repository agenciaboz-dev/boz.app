import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Subroute } from "../Subroute"
import { api } from "../../../../api"

interface MessagesScreenProps {}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({}) => {
    const [loading, setLoading] = useState(false)

    const fetchMessages = async () => {
        setLoading(true)

        try {
            const response = await api.get("/whatsapp/messages")
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    return <Subroute title="Mensagens"></Subroute>
}
