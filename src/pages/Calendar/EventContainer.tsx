import React from "react"
import { Box, Tooltip } from "@mui/material"
import { useColors } from "../../hooks/useColors"

interface EventContainerProps {
    event: Event
}

export const EventContainer: React.FC<EventContainerProps> = ({ event }) => {
    return (
        <Box sx={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <Box>
                <Tooltip title={event.summary} arrow>
                    <p style={{ whiteSpace: "nowrap" }}>{event.summary}</p>
                </Tooltip>
            </Box>
        </Box>
    )
}
