import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Grid, IconButton } from "@mui/material"
import { Nagazap } from "../../../../types/server/class/Nagazap"
import { Subroute } from "../Subroute"
import { api } from "../../../../api"
import { Refresh } from "@mui/icons-material"
import { LogsList } from "./LogsList"

interface LogsProps {
    nagazap?: Nagazap
    setNagazap: React.Dispatch<React.SetStateAction<Nagazap>>
}

export const Logs: React.FC<LogsProps> = ({ nagazap, setNagazap }) => {
    const [loading, setLoading] = useState(false)

    const refresh = async () => {
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
        refresh()
    }, [])

    return nagazap ? (
        <Subroute
            title="Logs"
            right={
                <IconButton onClick={refresh} disabled={loading}>
                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : <Refresh />}
                </IconButton>
            }
        >
            <Grid container columns={2} spacing={3}>
                <LogsList list={nagazap.sentMessages} type="success" />
                <LogsList list={nagazap.failedMessages} type="error" />
            </Grid>
        </Subroute>
    ) : null
}
