import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Paper, useMediaQuery } from "@mui/material"
import axios from "axios"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { gitToken } from "../../api/gitToken"
import { useUser } from "../../hooks/useUser"
import UpdateIcon from "@mui/icons-material/Update"
import colors from "../../style/colors"
import { useIo } from "../../hooks/useIo"

interface UpdateProps {
    user: User
}

export const Update: React.FC<UpdateProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { latestVersion, downloadUrl } = useUser().electron

    const [electron] = useState(window.electron)
    const [currentVersion, setCurrentVersion] = useState("")

    useEffect(() => {
        if (electron) {
            io.emit("electron:update")

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
                padding: isMobile ? "8vw 0" : "2vw",
                margin: "2vw 5vw",
                flexDirection: "column",
                gap: isMobile ? "4vw" : "2vw",
            }}
        >
            <h1
                style={{
                    alignSelf: isMobile? "center" : "start"
                }}
            >
                Atualização
            </h1>
            <Paper sx={{ backgroundColor: "transparent", flexDirection: "column", padding: "2vw", borderRadius: "0 3vw 0" }} elevation={3}>
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
                                    display: isMobile? "none" : ""
                                }}
                            >
                                <UpdateIcon color="secondary" fontSize="large" />
                            </Box>
                            <Box sx={{ flexDirection: "column", justifyContent: "center", fontSize: isMobile ? "4vw" : "", gap: isMobile? "2vw" : "" }}>
                                <h3>Boz App </h3>
                                <Box sx={{ gap: isMobile? "2vw" : "1vw", flexDirection: isMobile? "column" : "" }}>
                                    <Box sx={{ gap: isMobile? "1vw" : "0.5vw", alignItems: "center" }}>
                                        <p style={{ fontSize: isMobile? "4vw" : "1vw" }}>Versão atual: {currentVersion}</p>
                                        {latestVersion == currentVersion ? <CheckCircleIcon color="success" /> : <ErrorIcon color="warning" />}
                                    </Box>
                                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                                        <p style={{ fontSize: isMobile? "4vw" : "1vw" }}>Última versão: {latestVersion}</p>
                                        {!latestVersion && <CircularProgress size="1rem" color="primary" />}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            sx={{ color: "#fff", height: "auto", width: "auto", fontSize: isMobile? "4vw" : "1vw", padding: isMobile? "2vw" : "" }}
                            variant="contained"
                            disabled={!!latestVersion && latestVersion == currentVersion}
                            onClick={() => window.open(downloadUrl, "_blank")?.focus()}
                        >
                            Baixar<br />atualização
                        </Button>
                    </Box>
                ) : (
                    <Box>Para atualizar, instale o aplicativo Boz App</Box>
                )}
            </Paper>
        </Box>
    )
}
