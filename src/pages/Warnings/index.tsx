import React, { useEffect, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { useWarnings } from "../../hooks/useWarnings"
import { useUser } from "../../hooks/useUser"
import { NewWarning } from "./NewWarning"
import { WarningContainer } from "./WarningContainer"

interface WarningsProps {
    user: User
}

export const Warnings: React.FC<WarningsProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const warnings = useWarnings()

    const { isAdmin } = useUser()

    const [list, setList] = useState<Warning[]>(warnings.list)

    useEffect(() => {
        setList(warnings.list)
    }, [warnings.list])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box
                sx={{ color: "primary.main", padding: isMobile? "8vw 5vw" : "2vw", flexDirection: "column", gap: isMobile? "12vw" : "2vw", width: "100%", overflowY: "auto", height: "90vh" }}
            >
                <h1 style={{textAlign: isMobile? "center" : "start", fontSize: isMobile? "6vw" : "2vw", fontWeight: "700"}}>Avisos</h1>

                {isAdmin() && <NewWarning user={user} />}

                {list
                    .sort((a, b) => b.id - a.id)
                    .map((warning) => (
                        <WarningContainer key={warning.id} warning={warning} user={user} />
                    ))}
            </Box>
        </Box>
    )
}
