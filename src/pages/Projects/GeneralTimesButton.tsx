import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { day_button_style } from "../../style/day_button_style"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"

interface GeneralTimesButtonProps {
    working: boolean
    times: ProjectTime[]
    label: string
}

export const GeneralTimesButton: React.FC<GeneralTimesButtonProps> = ({ working, times, label }) => {
    const [workedTime, setWorkedTime] = useState(getTotalWorked(times))
    const [formattedTime, setFormattedTime] = useState(formatTotalWorked(workedTime, true))

    useEffect(() => {
        setFormattedTime(formatTotalWorked(workedTime, true))
    }, [workedTime])

    useEffect(() => {
        if (working) {
            const interval = setInterval(() => {
                setWorkedTime((total) => total + 1000)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [working])

    return (
        <Box sx={day_button_style}>
            <Box sx={{ fontSize: "1.2rem" }}>{label}</Box>
            <Box>{formattedTime}</Box>
        </Box>
    )
}
