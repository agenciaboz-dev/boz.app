import React from "react"
import { Box, alpha } from "@mui/material"
import { useMuiTheme } from "../hooks/useMuiTheme"
import { useFormatMessageTime } from "../hooks/useFormatMessageTime"
import { useMediaQuery } from "@mui/material"

interface MessageProps {
    message: Message
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const formatTime = useFormatMessageTime()
    const theme = useMuiTheme()
    const primary = alpha(theme.palette.primary.main, 0.5)
    const secondary = alpha(theme.palette.grey[500], 0.5)
    return (
        <Box
            sx={{
                maxWidth: isMobile ? "90%" : "75%",
                padding: isMobile ? "3vw" :"0.75vw",
                flexDirection: "column",
                alignSelf: message.fromMe ? "flex-end" : "flex-start",
                textAlign: message.fromMe ? "end" : "start",
                borderRadius: message.fromMe ? ( isMobile ? "3vw 3vw 0 3vw" : "1vw 1vw 0 1vw" ) : ( isMobile ? "3vw 3vw 3vw 0" : "1vw 1vw 1vw 0" ),
                bgcolor: message.fromMe ? primary : secondary,
            }}
        >
            <p style={{ wordBreak: "break-all", whiteSpace: "pre-line" }}>{message.body}</p>
            <p style={{ fontSize: isMobile ? "3vw" : "0.6vw", marginTop: isMobile ? "2vw" : "" }}>{formatTime(new Date(message.timestamp * 1000))}</p>
        </Box>
    )
}
