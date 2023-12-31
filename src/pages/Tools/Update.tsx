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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import WindowIcon from "@mui/icons-material/Window"
import FlutterDashIcon from "@mui/icons-material/FlutterDash"

interface UpdateProps {
    user: User
}

const DownloadButton: React.FC<{ title: string; url: string; icon: React.ReactNode; disabled?: boolean }> = ({ title, url, icon, disabled }) => {
    const Icon = () => icon
    return (
        <Button
            variant="contained"
            sx={{ color: "background.default" }}
            startIcon={<Icon />}
            onClick={() => window.open(url)?.focus()}
            disabled={disabled}
        >
            {title}
        </Button>
    )
}

export const Update: React.FC<UpdateProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { latestVersion } = useUser().electron

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
                    alignSelf: isMobile ? "center" : "start",
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
                                    display: isMobile ? "none" : "",
                                }}
                            >
                                <UpdateIcon color="secondary" fontSize="large" />
                            </Box>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    fontSize: isMobile ? "4vw" : "",
                                    gap: isMobile ? "2vw" : "",
                                }}
                            >
                                <h3>Boz App </h3>
                                <Box sx={{ gap: isMobile ? "2vw" : "1vw", flexDirection: isMobile ? "column" : "" }}>
                                    <Box sx={{ gap: isMobile ? "1vw" : "0.5vw", alignItems: "center" }}>
                                        <p style={{ fontSize: isMobile ? "4vw" : "1vw" }}>Versão atual: {currentVersion}</p>
                                        {latestVersion == currentVersion ? <CheckCircleIcon color="success" /> : <ErrorIcon color="warning" />}
                                    </Box>
                                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                                        <p style={{ fontSize: isMobile ? "4vw" : "1vw" }}>Última versão: {latestVersion}</p>
                                        {!latestVersion && <CircularProgress size="1rem" color="primary" />}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <DownloadButton
                            disabled={!!latestVersion && latestVersion == currentVersion}
                            url={
                                electron.process.platform == "linux"
                                    ? `https://github.com/agenciaboz-dev/boz.electron/releases/download/v${latestVersion}/boz.electron_${latestVersion}_amd64.deb`
                                    : `https://github.com/agenciaboz-dev/boz.electron/releases/download/v${latestVersion}/Boz-setup.exe`
                            }
                            title="Baixar atualização"
                            icon={electron.process.platform == "linux" ? <FlutterDashIcon /> : <WindowIcon />}
                        />
                    </Box>
                ) : (
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                            <ErrorOutlineIcon color="primary" />
                            Para baixar o Boz App, selecione sua plataforma
                        </Box>
                        <Box sx={{ gap: "1vw" }}>
                            <DownloadButton
                                title="Windows"
                                url={`https://github.com/agenciaboz-dev/boz.electron/releases/download/v${latestVersion}/Boz-setup.exe`}
                                icon={<WindowIcon />}
                            />
                            <DownloadButton
                                title="Linux"
                                url={`https://github.com/agenciaboz-dev/boz.electron/releases/download/v${latestVersion}/boz.electron_${latestVersion}_amd64.deb`}
                                icon={<FlutterDashIcon />}
                            />
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}
