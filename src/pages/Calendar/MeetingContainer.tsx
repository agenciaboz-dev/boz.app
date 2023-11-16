import React from "react"
import { Box, Tooltip } from "@mui/material"
import { useColors } from "../../hooks/useColors"

interface MeetingContainerProps {
    meeting: Event
}

export const MeetingContainer: React.FC<MeetingContainerProps> = ({ meeting }) => {
    const size = "0.5vw"
    const colors = useColors()
    const self = meeting.attendees?.find((item) => item.self)
    const startTime = new Date(meeting.start.dateTime as string).toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <Box
            sx={{
                alignItems: "center",
                gap: "0.3vw",
                padding: "0.3vw 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            <Box
                sx={{
                    width: size,
                    height: size,
                    borderRadius: "100%",
                    outline: `1px solid ${self?.responseStatus == "accepted" ? colors.success : ""}`,
                    bgcolor: self?.responseStatus == "accepted" ? colors.success : "",
                }}
            ></Box>
            <p style={ { fontSize: "0.55vw" } }>{ startTime }</p>
            
            <Tooltip title={meeting.summary} arrow>
                <p>{meeting.summary}</p>
            </Tooltip>
        </Box>
    )
}
