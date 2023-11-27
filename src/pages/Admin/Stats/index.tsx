import React from "react"
import { Box, Paper, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { useUser } from "../../../hooks/useUser"
import { StatusLogs } from "./StatusLogs"

interface StatsProps {
    user: User
}

export const Stats: React.FC<StatsProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const { logs } = useUser()

    return (
        <Box sx={{ padding: isMobile ? "0 5vw" : "2vw" }}>
            <StatusLogs logs={logs.everybody_status.sort((a, b) => b.id - a.id)} />
        </Box>
    )
}
