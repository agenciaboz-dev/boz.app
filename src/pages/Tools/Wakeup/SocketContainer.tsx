import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Paper } from "@mui/material"
import { useWakeup } from "../../../hooks/useWakeup"
import { ElectronAPI } from "@electron-toolkit/preload"
import { EventsBlock } from "./EventsBlock"

interface SocketContainerProps {
    api: Wakeup
}

export const SocketContainer: React.FC<SocketContainerProps> = ({ api }) => {
    const { socket, connect, disconnect } = useWakeup()
    const [connecting, setConnecting] = useState(false)

    const electron = window.electron as ElectronAPI

    const handleConnectClick = async () => {
        setConnecting(true)
        await connect(api)
    }

    const handleDisconnectClick = async () => {
        await disconnect()
    }

    useEffect(() => {
        electron.ipcRenderer.on("socket:connected", () => {
            setConnecting(false)
        })
    }, [])

    return (
        <Paper sx={{ flexDirection: "column", bgcolor: "background.default", width: "100%", flex: 1, padding: "1vw" }}>
            {socket.connected == api.id ? (
                <Box sx={{ flexDirection: "column" }}>
                    <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ width: "1vw", height: "1vw", bgcolor: "success.main", borderRadius: "100%" }}></Box>
                        <p>Socket connected to {api.name}</p>
                        <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleDisconnectClick}>
                            disconnect
                        </Button>
                    </Box>
                    <EventsBlock />
                </Box>
            ) : (
                <Box sx={{ gap: "1vw", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ width: "1vw", height: "1vw", bgcolor: "error.main", borderRadius: "100%" }}></Box>
                    <p>Socket {api.name} not connected</p>
                    <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleConnectClick}>
                        {connecting ? <CircularProgress color="secondary" size="1.5rem" /> : "connect"}
                    </Button>
                </Box>
            )}
        </Paper>
    )
}
