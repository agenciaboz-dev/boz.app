import React, { useEffect } from "react"
import { Box, Button } from "@mui/material"
import { Header } from "../../components/Header"
import { backgroundStyle } from "../../style/background"
import { useGoogle } from "../../hooks/useGoogle"
import { useUser } from "../../hooks/useUser"
import { useIo } from "../../hooks/useIo"
import { LoadingCalendar } from "./LoadingCalendar"
import { CalendarContainer } from "./CalendarContainer"

interface CalendarProps {
    user: User
}

export const Calendar: React.FC<CalendarProps> = ({ user }) => {
    const io = useIo()
    const { calendar } = useGoogle()
    const { logout } = useUser()

    useEffect(() => {}, [])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            {user.googleToken ? (
                calendar ? (
                    <CalendarContainer calendar={calendar} />
                ) : (
                    <LoadingCalendar />
                )
            ) : (
                <Box sx={{ flexDirection: "column", color: "text.secondary", alignItems: "center", gap: "1vw", padding: "1vw" }}>
                    <p>Desconecte-se e logue com conta do google para vincular os acessos:</p>
                    <Button variant="contained" onClick={logout} sx={{ color: "background.default" }}>
                        Desconectar
                    </Button>
                </Box>
            )}
        </Box>
    )
}
