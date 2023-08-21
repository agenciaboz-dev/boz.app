import React from "react"
import { Box } from "@mui/material"
import { useStopwatch } from "react-timer-hook"

interface StopwatchProps {}

export const Stopwatch: React.FC<StopwatchProps> = ({}) => {
    const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, reset } = useStopwatch({ autoStart: true })

    return (
        <Box sx={{ fontSize: "0.9vw" }}>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </Box>
    )
}
