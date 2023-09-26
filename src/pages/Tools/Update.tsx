import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material"
import axios from "axios"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { gitToken } from "../../api/gitToken"
import { useUser } from "../../hooks/useUser"

interface UpdateProps {
    user: User
}

export const Update: React.FC<UpdateProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const { latestVersion, downloadUrl } = useUser().electron

    const [electron] = useState(window.electron)
    const [currentVersion, setCurrentVersion] = useState("")

    useEffect(() => {
        if (electron) {
            const getVersion = async () => {
                const version = await electron.ipcRenderer.invoke("version")
                setCurrentVersion(version)
            }

            getVersion()
        }
    }, [latestVersion])

    return (
        <Box
            sx={{
                color: "primary.main",
                padding: isMobile ? "8vw 2vw 2vw 2vw" : "2vw",
                margin: "2vw 5vw",
                flexDirection: "column",
                gap: isMobile ? "4vw" : "2vw",
            }}
        >
            <h1>Atualizar Boz App</h1>
            {electron ? (
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <Box sx={{ gap: "1vw", alignItems: "center" }}>
                        <p>Versão atual: {currentVersion}</p>
                        {latestVersion == currentVersion ? <CheckCircleIcon color="success" /> : <ErrorIcon color="warning" />}
                    </Box>
                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                        <p>Última versão: {latestVersion}</p>
                        {!latestVersion && <CircularProgress size="1rem" color="primary" />}
                    </Box>
                    <Button
                        variant="contained"
                        disabled={!!latestVersion && latestVersion == currentVersion}
                        onClick={() => window.open(downloadUrl, "_blank")?.focus()}
                    >
                        Baixar atualização
                    </Button>
                </Box>
            ) : (
                <Box>Você não tá usando o app, se saia</Box>
            )}
        </Box>
    )
}
