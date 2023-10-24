import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
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
        <Box sx={{ flexDirection: "column" }}>
            {socket.connected == api.id ? (
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <Box sx={{ gap: "1vw", alignItems: "center" }}>
                        <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleDisconnectClick}>
                            disconnect
                        </Button>
                        <p>events</p>
                    </Box>
                    <EventsBlock />
                </Box>
            ) : (
                <Box>
                    <Button variant="contained" sx={{ color: "secondary.main" }} onClick={handleConnectClick}>
                        {connecting ? <CircularProgress color="secondary" size="1.5rem" /> : "connect"}
                    </Button>
                </Box>
            )}
        </Box>
    )
}
