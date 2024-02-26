import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"
import { ContainerSkeleton } from "./ContainerSkeleton"
import axios from "axios"

interface TasksContainerProps {}

export const TasksContainer: React.FC<TasksContainerProps> = ({}) => {
    const [weather, setWeather] = useState("")

    const getWeather = async () => {
        const response = await axios.get("https://wttr.in/curitiba?lang=pt-br&format=1")
        setWeather(response.data.replace("+", " "))
    }

    useEffect(() => {
        const interval = setInterval(() => getWeather(), 1000 * 60 * 1)
        getWeather()

        return () => {
            clearInterval(interval)
        }
    }, [])

    return weather ? (
        <ContainerWrapper>
            <Box sx={{ fontSize: "5rem", fontWeight: "bold", justifyContent: "center", alignItems: "center", height: 1 }}>{weather}</Box>
        </ContainerWrapper>
    ) : (
        <ContainerSkeleton />
    )
}
