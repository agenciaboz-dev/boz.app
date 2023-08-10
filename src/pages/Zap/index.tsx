import React, { useEffect } from "react"
import { Box, Skeleton } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { useZap } from "../../hooks/useZap"
import { QrCode } from "./QrCode"
import { useIo } from "../../hooks/useIo"

interface ZapProps {
    user: User
}

export const Zap: React.FC<ZapProps> = ({ user }) => {
    const io = useIo()
    const { client, qrcode } = useZap()

    useEffect(() => {
        io.emit("zap:sync")
        console.log(!!qrcode)
    }, [])

    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            {client ? (
                <Box sx={{ flexDirection: "column" }}>
                    <p>zap</p>
                </Box>
            ) : (
                <QrCode qrcode={qrcode} />
            )}
        </Box>
    )
}
