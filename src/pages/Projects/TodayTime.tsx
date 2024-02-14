import React, { useEffect, useState } from "react"
import { Box, LinearProgress } from "@mui/material"
import { formatTotalWorked, getTotalWorked } from "../Tools/project/getTotalWorked"
import { Progress } from "@mantine/core"
import { useColors } from "../../hooks/useColors"
import { getTodayTimes } from "../Tools/project/getTodayTimes"

interface TodayTimeProps {
    worker: ProjectWorker
    working: boolean
}

export const TodayTime: React.FC<TodayTimeProps> = ({ worker, working }) => {
    const colors = useColors()
    const today_times = getTodayTimes(worker.times)
    const [workedToday, setWorkedToday] = useState(getTotalWorked(today_times))
    const [formatedWorkedTime, setFormatedWorkedTime] = useState(formatTotalWorked(workedToday))

    const getProgressValue = () => {
        const worked = (workedToday * 100) / (8 * 60 * 60 * 1000)
        return worked > 100 ? 100 : worked
    }

    useEffect(() => {
        setFormatedWorkedTime(formatTotalWorked(workedToday))
    }, [workedToday])

    useEffect(() => {
        if (working) {
            const interval = setInterval(() => {
                setWorkedToday((total) => total + 1000)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [working])

    return (
        <Box sx={{ flexDirection: "column", height: "100%", justifyContent: "space-between", width: "63%" }}>
            <Box sx={{ fontSize: "1.8rem" }}>tempo do dia</Box>
            {/* <LinearProgress variant="determinate" value={getProgressValue()} sx={{ height: "1.5vw", borderRadius: "1vw" }} /> */}
            <Progress.Root size={"1.5vw"} radius={"2vw"}>
                <Progress.Section value={getProgressValue()} color={colors.primary}>
                    <Progress.Label>{formatedWorkedTime}</Progress.Label>
                </Progress.Section>
            </Progress.Root>
        </Box>
    )
}
