import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material"
import axios from "axios"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { gitToken } from "../../api/gitToken"

interface UpdateProps {
    user: User
}

export const Update: React.FC<UpdateProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [electron] = useState(window.electron)
    const [latestVersion, setLatestVersion] = useState<string>()
    const [currentVersion, setCurrentVersion] = useState(electron?.process.env.npm_package_version)
    const [loadingGitData, setLoadingGitData] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState("")

    useEffect(() => {
        setLoadingGitData(true)
        axios
            .get("https://api.github.com/repos/agenciaboz-dev/boz.electron/releases/latest", {
                headers: { Authorization: `token ${gitToken}` },
            })
            .then((response) => {
                console.log(response.data)
                setLatestVersion(response.data.name.replace("v", ""))
                setDownloadUrl(response.data.assets[0].browser_download_url)
                setLoadingGitData(false)
            })
    }, [])

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
                        {!loadingGitData && (latestVersion == currentVersion ? <CheckCircleIcon color="success" /> : <ErrorIcon color="warning" />)}
                    </Box>
                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                        <p>Última versão: {latestVersion}</p>
                        {loadingGitData && <CircularProgress size="1rem" color="primary" />}
                    </Box>
                    <Button
                        variant="contained"
                        disabled={loadingGitData || latestVersion == currentVersion}
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
