import React from "react"
import { Box } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { useWarnings } from "../../hooks/useWarnings"
import { useUser } from "../../hooks/useUser"
import { NewWarning } from "./NewWarning"

interface WarningsProps {
    user: User
}

export const Warnings: React.FC<WarningsProps> = ({ user }) => {
    const warnings = useWarnings()
    const { isAdmin } = useUser()

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ color: "primary.main", padding: "2vw", flexDirection: "column", gap: "2vw" }}>
                <h1 style={{}}>Avisos</h1>

                {isAdmin() && <NewWarning user={user} />}
            </Box>
        </Box>
    )
}
