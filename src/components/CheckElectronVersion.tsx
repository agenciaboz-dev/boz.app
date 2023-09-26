import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import axios from "axios"
import { useConfirmDialog } from "burgos-confirm"
import { useNavigate } from "react-router-dom"

interface CheckElectronVersionProps {}

export const CheckElectronVersion: React.FC<CheckElectronVersionProps> = ({}) => {
    const navigate = useNavigate()
    const { confirm } = useConfirmDialog()

    const [electron] = useState(window.electron)

    useEffect(() => {
        if (electron)
            axios
                .get("https://api.github.com/repos/agenciaboz-dev/boz.electron/releases/latest", {
                    headers: {
                        Authorization: "Bearer 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",
                    },
                })
                .then((response) => {
                    const currentVersion = electron.process.env.npm_package_version
                    const latestVersion = response.data.name.replace("v", "")

                    if (currentVersion != latestVersion)
                        confirm({
                            title: "Atualização",
                            content: "Seu app está desatualizado, clica ai pra baixar a nova",
                            hideCancel: true,
                            onConfirm: () => navigate("/tools/update"),
                        })
                })
    }, [])

    return <></>
}
