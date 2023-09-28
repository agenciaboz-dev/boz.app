import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Paper, useMediaQuery } from "@mui/material"
import axios from "axios"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { gitToken } from "../../api/gitToken"
import { useUser } from "../../hooks/useUser"
import UpdateIcon from "@mui/icons-material/Update"
import colors from "../../style/colors"

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
            <h1>Atualização </h1>
            <Paper
                sx={{ backgroundColor: "transparent", flexDirection: "column", padding: "2vw", borderRadius: "0 3vw 0" }}
                elevation={3}
            >
                {electron ? (
                    <Box sx={{ flexDirection: "row", gap: "1vw", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ gap: "2vw" }}>
                            <Box
                                sx={{
                                    backgroundColor: "primary.main",
                                    width: "4vw",
                                    height: "4vw",
                                    borderRadius: "50%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <UpdateIcon color="secondary" fontSize="large" />
                            </Box>
                            <Box sx={{ flexDirection: "column", justifyContent: "center" }}>
                                <h3>Boz App </h3>
                                <Box sx={{ gap: "1vw" }}>
                                    <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                                        <p style={{ fontSize: "1vw" }}>Versão atual: {currentVersion}</p>
                                        {latestVersion == currentVersion ? (
                                            <CheckCircleIcon color="success" />
                                        ) : (
                                            <ErrorIcon color="warning" />
                                        )}
                                    </Box>
                                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                                        <p style={{ fontSize: "1vw" }}>Última versão: {latestVersion}</p>
                                        {!latestVersion && <CircularProgress size="1rem" color="primary" />}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            sx={{ color: "#fff", height: "3vw" }}
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
            </Paper>
        </Box>
    )
}
