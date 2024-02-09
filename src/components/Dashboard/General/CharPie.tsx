import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"
import { COLORSTHEME } from "../../../pages/Tools/Stats/dataCharts"

interface ChartPieProps {
    pieData: {
        name: string
        value: number
    }[]
}

export const ChartPie: React.FC<ChartPieProps> = ({ pieData }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
                width: "60%",
                height: isMobile ? "auto" : "100%",
                padding: isMobile ? "8vw 5vw" : "1vw 1vw  ",
                flexDirection: "column",
            }}
        >
            <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>Projetos x Tempo</p>
            <PieChart width={500} height={400}>
                <Pie
                    data={pieData}
                    cx={110}
                    cy={130}
                    labelLine={false}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORSTHEME[index % COLORSTHEME.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="left" verticalAlign="top" wrapperStyle={{ marginTop: "20px" }} />
            </PieChart>
        </Box>
    )
}
