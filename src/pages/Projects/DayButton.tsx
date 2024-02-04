import React, { useEffect, useState } from "react"
import { Box, MenuItem, SxProps } from "@mui/material"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"
import { getWeekDay } from "../Tools/project/getWeekDay"
import { day_button_style } from "../../style/day_button_style"

interface DayButtonProps {
    date: Date
    worker: ProjectWorker
    working: boolean
}

export const DayButton: React.FC<DayButtonProps> = ({ date, worker, working }) => {
    const times = worker.times.filter((time) => new Date(Number(time.started)).getDate() == date.getDate())
    const today = date.getDate() == new Date().getDate()

    const button_style: SxProps = {
        ...day_button_style,
        color: today ? "primary.main" : "",
        fontWeight: today ? "bold" : "",
    }

    const [workedTime, setWorkedTime] = useState(getTotalWorked(times))
    const [formattedTime, setFormattedTime] = useState(formatTotalWorked(workedTime, true))

    useEffect(() => {
        setFormattedTime(formatTotalWorked(workedTime, !today))
    }, [workedTime])

    useEffect(() => {
        if (working && today) {
            const interval = setInterval(() => {
                setWorkedTime((total) => total + 1000)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [working])

    return (
        <MenuItem key={date.getTime()} sx={{ padding: 0, minWidth: 0, minHeight: 0, ...button_style }}>
            <Box sx={{ fontSize: "1.2rem" }}>{getWeekDay(date.getDay())}</Box>
            <Box>{formattedTime}</Box>
        </MenuItem>
    )
}
