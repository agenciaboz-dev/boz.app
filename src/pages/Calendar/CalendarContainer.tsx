import React, { useEffect, useState } from "react"
import { Box, Grid, Paper } from "@mui/material"
import { DayContainer } from "./DayContainer"
import { useArray } from "burgos-array"
import formatDate from "../../tools/formatDate"

interface CalendarContainerProps {
    calendar: Calendar
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({ calendar }) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()

    const { newArray } = useArray()

    const [previousDays, setPreviousDays] = useState(new Array(firstDay).fill(null).map((_, index) => index + 1))
    const [monthDays, setMonthDays] = useState(
        Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            return day
        })
    )

    const getEventsPerDay = (event: Event, day: number) => {
        if (event.start.date && event.end.date) {
            const start = new Date(event.start.date)
            const end = new Date(event.end.date)
            const date = new Date(currentYear, currentMonth, day)

            if (date >= start && date <= end) {
                return event
            }
        }
    }

    const getMeetingsPerDay = (event: Event, day: number) => {
        if (event.start.dateTime && event.end.dateTime) {
            const start = formatDate.normalize(new Date(event.start.dateTime))
            const end = formatDate.normalize(new Date(event.end.dateTime))
            const date = formatDate.normalize(new Date(currentYear, currentMonth, day))

            if (date >= start && date <= end) {
                return event
            }
        }
    }

    useEffect(() => {
        console.log({ daysInMonth, firstDay, events: calendar.items })
    }, [])

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", padding: "2vw", color: "primary.main" }}>
            <p>{calendar.summary}</p>
            <Paper sx={{ flexDirection: "column", padding: "1vw 2vw", bgcolor: "background.default", height: "80vh" }}>
                <Box sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <Grid container spacing={0} sx={{}} columns={7}>
                        {newArray(7).map((day) => (
                            <Grid key={day} item xs={1} sx={{ justifyContent: "center", marginBottom: "0.5vw", fontWeight: "bold" }}>
                                {formatDate.weekDay(day)}
                            </Grid>
                        ))}
                        {previousDays.map((day) => (
                            <DayContainer
                                key={day}
                                day={day}
                                events={calendar.items.filter((event) => getEventsPerDay(event, day))}
                                meetings={calendar.items.filter((event) => getMeetingsPerDay(event, day))}
                            />
                        ))}
                        {monthDays.map((day) => (
                            <DayContainer
                                key={day}
                                day={day}
                                events={calendar.items.filter((event) => getEventsPerDay(event, day))}
                                meetings={calendar.items.filter((event) => getMeetingsPerDay(event, day))}
                            />
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}
