import React from "react"
import { Box, Paper } from "@mui/material"
import { useWakeup } from "../../../hooks/useWakeup"
import { Download, Upload } from "@mui/icons-material"
import { TaiTextField } from "../../../components/TaiTextField"

interface EventsBlockProps {}

interface EventContainerProps {
    event: ElectronWakeupEvent
}

const EventContainer: React.FC<EventContainerProps> = ({ event }) => {
    return (
        <Box sx={{ gap: "0.5vw", padding: "0.5vw 0" }}>
            {/* <p>{JSON.stringify(event.data, null, 4)}</p> */}
            <TaiTextField
                value={JSON.stringify(event.data, null, 4)}
                multiline
                sx={{}}
                InputProps={{
                    readOnly: true,
                    sx: {
                        // maxWidth: "40vw",
                        alignItems: "flex-start",
                        color: "text.secondary",
                        gap: "1vw",
                    },
                    startAdornment: (
                        <Box sx={{ flexDirection: "column", color: "text.primary" }}>
                            <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                {event.incoming ? <Download color="warning" /> : <Upload color="success" />}
                                <p style={{ fontWeight: "bold" }}>{event.event}</p>
                            </Box>
                            <p style={{ fontSize: "0.7vw" }}>{event.datetime.toLocaleDateString("pt-br", {})}</p>
                            <p style={{ fontSize: "0.7vw" }}>{event.datetime.toLocaleTimeString("pt-br", {})}</p>
                        </Box>
                    ),
                }}
            />
        </Box>
    )
}

export const EventsBlock: React.FC<EventsBlockProps> = ({}) => {
    const { socket } = useWakeup()
    return (
        <Paper sx={{ flexDirection: "column", height: "15vw", overflowY: "auto", bgcolor: "background.default", padding: "1vw" }}>
            {socket.events
                .sort((a, b) => b.datetime.getTime() - a.datetime.getTime())
                .map((event) => (
                    <EventContainer key={event.datetime.getTime()} event={event} />
                ))}
        </Paper>
    )
}
