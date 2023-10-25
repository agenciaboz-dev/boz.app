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
                label={event.datetime.toLocaleString("pt-br")}
                inputProps={{ style: { fontSize: "0.8vw" } }}
                InputProps={{
                    readOnly: true,
                    sx: {
                        // maxWidth: "40vw",
                        alignItems: "flex-start",
                        color: "text.secondary",
                        gap: "1vw",
                    },
                    startAdornment: (
                        <Box sx={{ alignItems: "center", gap: "0.5vw", color: "text.primary" }}>
                            {event.incoming ? <Download color="warning" /> : <Upload color="success" />}
                            <p style={{ fontWeight: "bold" }}>{event.event}</p>
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
        <Box sx={{ flexDirection: "column", overflowY: "auto", height: "20vw" }}>
            {socket.events
                .sort((a, b) => b.datetime.getTime() - a.datetime.getTime())
                .map((event) => (
                    <EventContainer key={event.datetime.getTime()} event={event} />
                ))}
        </Box>
    )
}
