import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material"
import { SocketContainer } from "./SocketContainer"
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import { Event } from "./Event"

interface EventContainerProps {
    api: Wakeup
}

export const EventContainer: React.FC<EventContainerProps> = ({ api }) => {
    const [fullscreenSocket, setFullscreenSocket] = useState(false)
    
    return (
        <Box sx={{ flexDirection: "column", paddingRight: "1vw", flex: 1 }}>
            <Routes>
                <Route path="/:id" element={<Event api={api} fullscreenSocket={fullscreenSocket} />} />
            </Routes>
            <SocketContainer api={api} fullscreenSocket={fullscreenSocket} setFullscreenSocket={setFullscreenSocket} />
        </Box>
    )
}
