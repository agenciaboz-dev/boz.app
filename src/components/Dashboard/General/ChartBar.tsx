import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

interface ChartBarProps {
    data: any
}

export const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    return (
        <Box
            sx={{
                width: "100%",
                height: isMobile ? "auto" : "40%",
                padding: isMobile ? "8vw 5vw" : "1vw  ",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
            }}
        >
            <BarChart
                width={680} // Ajuste conforme necessário para acomodar todos os clientes
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="cliente" tick={{ fill: "gray", fontSize: 12 }} />
                <YAxis label={{ value: "Horas", angle: -90, position: "insideLeft" }} tick={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" fill={colors.primary} name="Cliente x Horas Mensais" radius={[5, 5, 0, 0]} />
            </BarChart>
        </Box>
    )
}
