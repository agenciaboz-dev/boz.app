import React from "react"
import { Box, Paper } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { useUser } from "../../../hooks/useUser"
import { StatusLogs } from "./StatusLogs"

interface StatsProps {
    user: User
}

export const Stats: React.FC<StatsProps> = ({ user }) => {
    const { logs } = useUser()

    return (
        <Box sx={{ padding: "2vw" }}>
            <StatusLogs logs={logs.status} />
        </Box>
    )
}
