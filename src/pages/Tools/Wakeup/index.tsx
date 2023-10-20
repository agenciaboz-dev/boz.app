import React from "react"
import { Box, Button, MenuItem, Paper } from "@mui/material"
import { useWakeup } from "../../../hooks/useWakeup"
import { useColors } from "../../../hooks/useColors"
import { ApiContainer } from "./ApiContainer"
import { Add } from "@mui/icons-material"

interface WakeupProps {
    user: User
}

export const Wakeup: React.FC<WakeupProps> = ({ user }) => {
    const { list } = useWakeup()
    const colors = useColors()

    const testApi: Wakeup = {
        id: 0,
        name: "Boz Api",
        baseUrl: "https://app.agenciaboz.com.br:4105",
        socket: false,
        creator: user,
    }

    return (
        <Box sx={{ color: colors.text.secondary, padding: "2vw" }}>
            <Paper sx={{ width: "15vw", height: "80vh", bgcolor: "background.default", flexDirection: "column" }}>
                <Button endIcon={<Add />} variant="contained" sx={{ color: colors.text.terciary, fontWeight: "bold" }}></Button>
                <ApiContainer api={testApi} />
            </Paper>
        </Box>
    )
}
