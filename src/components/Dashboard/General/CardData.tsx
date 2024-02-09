import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { BiSolidTimeFive } from "react-icons/bi"

interface CardDataProps {
    children?: React.ReactNode
    icon: React.ReactNode
    data: any
    title: string
}

export const CardData: React.FC<CardDataProps> = ({ children, icon, data, title }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()

    return (
        <Box
            sx={{
                boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                heigh: "max-content",
                maxHeight: "8vw",
                width: "48.5%",
                borderRadius: isMobile ? "0 2vw 0 0" : "0 1vw 0 1vw ",
                padding: "1vw",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box>
                <Box sx={{ flexDirection: "column" }}>
                    <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>{title}</p>
                    <p style={{ fontWeight: "bold", color: colors.terciary, fontSize: "1.3vw" }}>{data}</p>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "2.5vw",
                    height: "2.5vw",
                    bgcolor: colors.primary,
                    borderRadius: "0.3vw",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {icon}
            </Box>
        </Box>
    )
}
