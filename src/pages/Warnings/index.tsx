import React, { useEffect, useState } from "react"
import { Box, Paper, SxProps, Tab, Tabs, useMediaQuery } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { useWarnings } from "../../hooks/useWarnings"
import { useUser } from "../../hooks/useUser"
import { NewWarning } from "./NewWarning"
import { WarningContainer } from "./WarningContainer"
import { useColors } from "../../hooks/useColors"

interface WarningsProps {
    user: User
}

export const Warnings: React.FC<WarningsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const warnings = useWarnings()

    const [value, setValue] = React.useState("intern")

    const { isAdmin } = useUser()

    const [list, setList] = useState<Warning[]>(warnings.list)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const scrollBar: SxProps = {
        overflowY: "auto",

        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main" /* Cor do rastreador */,
            borderRadius: "10px" /* Borda arredondada do rastreador */,
        },

        /* Estilizando o rastreador quando estiver passando o mouse */
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555" /* Cor do rastreador ao passar o mouse */,
        },

        /* Estilizando o rastreador quando estiver ativo (arrastando) */
        "&::-webkit-scrollbar-thumb:active": {
            backgroundColor: "secondary" /* Cor do rastreador quando arrastado */,
        },
    }

    useEffect(() => {
        setList(warnings.list)
    }, [warnings.list])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box
                sx={{
                    color: "primary.main",
                    padding: isMobile ? "8vw 5vw" : "4vw",
                    flexDirection: "column",
                    gap: isMobile ? "12vw" : "1vw",
                    width: "100%",
                    overflowY: "auto",
                    height: "90vh",
                    ...scrollBar,
                }}
            >
                <h1
                    style={{
                        textAlign: isMobile ? "center" : "start",
                        fontSize: isMobile ? "6vw" : "2vw",
                        fontWeight: "700",
                    }}
                >
                    Avisos
                </h1>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab value={"intern"} label="Interno" sx={{ textTransform: "capitalize", fontSize: "1vw" }} />
                        <Tab value={"customer"} label="Clientes" sx={{ textTransform: "capitalize", fontSize: "1vw" }} />
                    </Tabs>
                </Box>
                {isAdmin() && <NewWarning user={user} customer={value === "customer" ? true : false} />}
                {value === "intern"
                    ? list
                          .sort((a, b) => b.id - a.id)

                          .map((warning) => <WarningContainer key={warning.id} warning={warning} user={user} />)
                    : value === "customer" && <p></p>}
            </Box>
        </Box>
    )
}
