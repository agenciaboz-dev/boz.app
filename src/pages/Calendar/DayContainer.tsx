import React from "react"
import { Box, Button, Grid, Tooltip } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import { useFormatMessageTime } from "../../hooks/useFormatMessageTime"
import { EventContainer } from "./EventContainer"
import { MeetingContainer } from "./MeetingContainer"

interface DayContainerProps {
    day: number
    events: Event[]
    meetings: Event[]
}

export const DayContainer: React.FC<DayContainerProps> = ({ day, events, meetings }) => {
    const colors = useColors()
    const formatDate = useFormatMessageTime()
    const today = new Date().getDate()
    const isToday = today == day

    return (
        <Grid
            item
            xs={1}
            sx={{
                height: "8vw",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    fontSize: "0.7vw",
                    flexDirection: "column",
                    alignItems: "center",
                    outline: `2px solid ${colors.primary}`,
                    padding: "0.5vw 0.5vw",
                    paddingLeft: "1vw",
                    color: isToday ? "secondary.main" : "text.secondary",
                    gap: "0.1vw",

                    bgcolor: isToday ? "background.paper" : "",
                    fontWeight: isToday ? "bold" : "",
                    borderRadius: "0 2.5vw ",
                    overflowX: "hidden",
                    // paddingBottom: "3vw",
                }}
            >
                <Box
                    sx={{
                        border: `${isToday ? "3px" : "1px"} solid ${isToday ? colors.secondary : colors.text.primary}`,
                        borderRadius: "50%",
                        padding: "0.3vw",
                        minWidth: "1.5vw",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "1.5vw",
                        width: "1.5vw",
                    }}
                >
                    <p style={{ color: isToday ? colors.secondary : colors.text.primary }}>{day}</p>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "67%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingRight: "0.3vw",
                        paddingBottom: "1vw",
                        overflowY: "auto",
                    }}
                >
                    <Box sx={{ flexDirection: "column", width: "100%" }}>
                        {events.map((event) => (
                            <EventContainer key={event.id} event={event} />
                        ))}
                    </Box>

                    <Box sx={{ flexDirection: "column", width: "100%" }}>
                        {meetings.map((meeting) => (
                            <MeetingContainer key={meeting.id} meeting={meeting} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}
