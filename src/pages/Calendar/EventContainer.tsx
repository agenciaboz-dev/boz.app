import React from "react"
import { Box } from "@mui/material"
import { useColors } from "../../hooks/useColors"

interface EventContainerProps {
    event: Event
}

export const EventContainer: React.FC<EventContainerProps> = ({ event }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Box>
                <p>{event.summary}</p>
            </Box>
        </Box>
    )
}
