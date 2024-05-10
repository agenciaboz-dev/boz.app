import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"
import { ContainerSkeleton } from "./ContainerSkeleton"
import axios from "axios"
import { useIo } from "../../hooks/useIo"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale"

import clear_day from "../../assets/icons/SVG/2nd Set - Color/clear-day.svg"
import clear_night from "../../assets/icons/SVG/2nd Set - Color/clear-night.svg"
import cloudy from "../../assets/icons/SVG/2nd Set - Color/cloudy.svg"
import fog from "../../assets/icons/SVG/2nd Set - Color/fog.svg"
import hail from "../../assets/icons/SVG/2nd Set - Color/hail.svg"
import partly_cloudy_day from "../../assets/icons/SVG/2nd Set - Color/partly-cloudy-day.svg"
import partly_cloudy_night from "../../assets/icons/SVG/2nd Set - Color/partly-cloudy-night.svg"
import rain_snow_showers_day from "../../assets/icons/SVG/2nd Set - Color/rain-snow-showers-day.svg"
import rain_snow_showers_night from "../../assets/icons/SVG/2nd Set - Color/rain-snow-showers-night.svg"
import rain_snow from "../../assets/icons/SVG/2nd Set - Color/rain-snow.svg"
import rain from "../../assets/icons/SVG/2nd Set - Color/rain.svg"
import showers_day from "../../assets/icons/SVG/2nd Set - Color/showers-day.svg"
import showers_night from "../../assets/icons/SVG/2nd Set - Color/showers-night.svg"
import sleet from "../../assets/icons/SVG/2nd Set - Color/sleet.svg"
import snow_showers_day from "../../assets/icons/SVG/2nd Set - Color/snow-showers-day.svg"
import snow_showers_night from "../../assets/icons/SVG/2nd Set - Color/snow-showers-night.svg"
import snow from "../../assets/icons/SVG/2nd Set - Color/snow.svg"
import thunder_rain from "../../assets/icons/SVG/2nd Set - Color/thunder-rain.svg"
import thunder_showers_day from "../../assets/icons/SVG/2nd Set - Color/thunder-showers-day.svg"
import thunder_showers_night from "../../assets/icons/SVG/2nd Set - Color/thunder-showers-night.svg"
import thunder from "../../assets/icons/SVG/2nd Set - Color/thunder.svg"
import wind from "../../assets/icons/SVG/2nd Set - Color/wind.svg"
import { WeatherComponent } from "./WeatherComponent"

interface WeatherContainerProps {}

export const WeatherContainer: React.FC<WeatherContainerProps> = ({}) => {
    const io = useIo()
    const [weather, setWeatherData] = useState<CurrentConditions>()
    const [icon, setIcon] = useState<string>("")

    const currentDateTime = new Date()
    const formattedDateTime = format(currentDateTime, "EEEE, HH:mm", { locale: ptBR })
    const [data, setData] = useState<CurrentConditions>()
    const [loading, setLoading] = useState(false)

    const dateTime = formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1)
    useEffect(() => {
        console.log({ dados: data })
        setData(data)
    }, [data])

    // const [weather, setWeather] = useState("")

    // const getWeather = async () => {
    //     const response = await axios.get("https://wttr.in/curitiba?lang=pt-br&format=1")
    //     setWeather(response.data.replace("+", " "))
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => getWeather(), 1000 * 60 * 1)
    //     getWeather()

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])
    // useEffect(() => {
    //     // console.log({ location: tillageSelect?.address.city })
    //     io.emit("weather:find", { data: "Curitiba" })

    //     io.on("weather:find:success", (data: any) => {
    //         setWeatherData(data.currentConditions)
    //         setIcon(data.currentConditions.icon)
    //     })
    //     io.on("weather:find:failed", (data: any) => {})

    //     return () => {
    //         io.off("weather:find:success")
    //         io.off("weather:find:failed")
    //     }
    // }, [])

    return (
        <ContainerWrapper>
            <WeatherComponent />
        </ContainerWrapper>
    )
}
