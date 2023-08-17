import React from "react"
import { Box, Paper } from "@mui/material"

interface StatusLogsProps {
    logs: StatusLog[]
}

const Circle: React.FC<{ status: number }> = ({ status }) => {
    const color = ["text.secondary", "success.main", "error.main", "warning.main"]
    return <Box sx={{ width: "0.75vw", height: "0.75vw", borderRadius: "50%", bgcolor: color[status] }}></Box>
}

export const StatusLogs: React.FC<StatusLogsProps> = ({ logs }) => {
    return (
        <Paper
            sx={{ flexDirection: "column", padding: "1vw", fontWeight: "bold", fontSize: "1vw", gap: "0.5vw", maxHeight: "80vh", overflowY: "auto" }}
        >
            Atividade
            {logs.map((log) => (
                <Box key={log.id} sx={{ width: "20vw", fontSize: "0.75vw", gap: "0.5vw", alignItems: "center", color: "text.secondary" }}>
                    <Circle status={log.status} />
                    <Box>{log.user.name.split(" ")[0]}</Box>
                    <Box sx={{ marginLeft: "auto" }}>{new Date(log.datetime).toLocaleString("pt-br")}</Box>
                </Box>
            ))}
        </Paper>
    )
}
