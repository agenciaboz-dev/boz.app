import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
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
import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useArray } from "burgos-array"

interface WeatherComponentProps {}

const style = {
    fontSize: "3vw",
    color: "gray",
}

const iconMappings: { [key: string]: string } = {
    "clear-day": clear_day,
    snow: snow,
    rain: rain,
    wind: wind,
    fog: fog,
    cloudy: cloudy,
    hail: hail,
    sleet: sleet,
    thunder: thunder,
    "clear-night": clear_night,
    "snow-showers-day": snow_showers_day,
    "snow-showers-night": snow_showers_night,
    "thunder-rain": thunder_rain,
    "thunder-showers-day": thunder_showers_day,
    "thunder-showers-night": thunder_showers_night,
    "showers-day": showers_day,
    "showers-night": showers_night,
    "partly-cloudy-day": partly_cloudy_day,
    "partly-cloudy-night": partly_cloudy_night,
    "rain-snow-showers-day": rain_snow_showers_day,
    "rain-snow-showers-night": rain_snow_showers_night,
    "rain-snow-": rain_snow,
}
const climaMappings: { [key: string]: string } = {
    "clear-day": "Dia Limpo",
    snow: "Neve",
    rain: "Chuva",
    wind: "Vento forte",
    fog: "Névoa",
    cloudy: "Nublado",
    hail: hail,
    sleet: "Granizo",
    thunder: "Raios",
    "clear-night": "Noite Limpa",
    "thunder-rain": "Chuva com raios",
    "thunder-showers-day": thunder_showers_day,
    "thunder-showers-night": thunder_showers_night,
    "showers-day": showers_day,
    "showers-night": showers_night,
    "partly-cloudy-day": "Parcialmente nublado",
    "partly-cloudy-night": "Parcialmente nublado",
    "rain-snow-showers-day": rain_snow_showers_day,
    "rain-snow-showers-night": rain_snow_showers_night,
    "rain-snow": rain_snow,
}
export const WeatherComponent: React.FC<WeatherComponentProps> = ({}) => {
    const currentDateTime = new Date()
    const formattedDateTime = format(currentDateTime, "EEEE, HH:mm", { locale: ptBR })
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const token = "HDYZ4EFPY3HGBAZCNDVBPJ5UX"
    const [icon, setIcon] = useState<string>("")
    const array = useArray().newArray(24)
    const days = useArray().newArray(10)

    const dateTime = formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1)

    useEffect(() => {
        const climate = async () => {
            try {
                const response = await axios.get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Curitiba?key=${token}`
                )
                const { icon } = response.data.currentConditions
                setData(response.data)
                console.log({ opa: response.data })
            } catch (error) {
                console.log(error)
            }
        }

        climate()
    }, [])

    return (
        data !== null && (
            <Box
                sx={{
                    height: "100%",
                    width: "1",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "0vw",
                }}
            >
                <Box sx={{ width: 1, height: 0.55, flexDirection: "column" }}>
                    <Box sx={{ width: 1, height: 0.55 }}>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between", width: 1 }}>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between", width: 0.5 }}>
                                <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                    <img src={clear_day} style={{ width: "3.5vw", height: "3.5vw" }} />
                                    <Box sx={{ alignItems: "start", gap: "0.3vw" }}>
                                        <p style={{ fontSize: "2.8rem", fontWeight: "600", margin: 0, padding: 0 }}>20</p>
                                        <p style={{ fontSize: "1.5rem", position: "relative", top: "0.6vw" }}>°C</p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ flexDirection: "column", alignItems: "end" }}>
                                <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>Clima</p>
                                <p style={{ fontSize: "0.9rem" }}>{dateTime}</p>
                                <p style={{ fontSize: "0.8rem" }}> Parcialmente Nublado</p>
                                {/* <p style={{ fontSize: "1rem" }}> {data?.icon && climaMappings[data.icon]}</p> */}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: 1, height: 0.45, gap: "1vw", overflowX: "auto", overflowY: "hidden" }}>
                        {array.map((item) => (
                            <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.3vw" }}>
                                <p style={{ fontSize: "0.8rem" }}>14:00</p>
                                <img src={partly_cloudy_day} style={{ width: "1.3vw", height: "1.3vw" }} />
                                <p style={{ fontSize: "0.8rem" }}>16°</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                <Box sx={{ width: 1, height: 0.42, justifyContent: "space-between", alignItems: "center" }}>
                    {days.map((item) => (
                        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.3vw" }}>
                            <p style={{ fontSize: "1rem" }}>Hoje</p>
                            <img src={rain} style={{ width: "2vw", height: "2vw" }} />
                            <p style={{ fontSize: "1rem" }}>16°</p>
                        </Box>
                    ))}
                </Box>
                {/* <Box sx={{ flexDirection: "row", alignItems: "center", gap: "3vw", width: "65%" }}>
                    {loading ? (
                        <CircularProgress sx={{ color: "white" }} />
                    ) : (
                        <img src={iconMappings[icon]} style={{ width: "17vw", height: "17vw" }} />
                    )}
                    <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                        <p style={{ fontSize: "8vw" }}>{data?.temp && ((data?.temp - 32) / 1.8).toFixed(0)}</p>
                        <p style={{ fontSize: "2.8vw", paddingTop: "3vw" }}>°C </p>
                    </Box>
                </Box>
                <Box sx={{ width: "35%", alignItems: "end" }}>
                    <p style={{ fontWeight: "600", fontSize: "3.5vw" }}>Clima</p>
                    <p style={{ fontSize: "2.9vw" }}>{dateTime}</p>
                    <p style={{ fontSize: "3vw" }}> {data?.icon && climaMappings[data.icon]}</p>
                </Box> */}
            </Box>
        )
    )
}
