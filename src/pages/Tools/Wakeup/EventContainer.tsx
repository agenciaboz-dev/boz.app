import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, SxProps, Tooltip, useMediaQuery } from "@mui/material"
import { SocketContainer } from "./SocketContainer"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { Event } from "./Event"

interface EventContainerProps {
    api: Wakeup
}

export const EventContainer: React.FC<EventContainerProps> = ({ api }) => {
    const [fullscreenSocket, setFullscreenSocket] = useState(false)
    const customScrollbar: SxProps = {
        "&::-webkit-scrollbar": {
            width: "0.5vw", // Largura da barra de rolagem
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main", // Cor do polegar da barra de rolagem
            borderRadius: "6px", // Raio da borda do polegar
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Cor da faixa da barra de rolagem
            borderRadius: "6px", // Raio da borda da faixa
        },
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                paddingRight: "1vw",
                padding: "1vw",
                flex: 1,
                overflow: "auto",
                overflowY: "auto",
                height: "100%",
                ...customScrollbar,
            }}
        >
            <Routes>
                <Route path="/:id" element={<Event api={api} fullscreenSocket={fullscreenSocket} />} />
            </Routes>
            <SocketContainer api={api} fullscreenSocket={fullscreenSocket} setFullscreenSocket={setFullscreenSocket} />
        </Box>
    )
}
