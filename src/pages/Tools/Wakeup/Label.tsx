import React from "react"
import { AlertColor, Box, useMediaQuery } from "@mui/material"

interface LabelProps {
    label: string
    color: AlertColor
}

export const Label: React.FC<LabelProps> = ({ label, color }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box
            sx={{
                bgcolor: `${color}.main`,
                fontSize: isMobile? "4vw" : "0.65vw",
                padding: "0.2vw 0.6vw",
                borderRadius: "1vw",
                color: "white",
                fontWeight: "bold",
            }}
        >
            {label}
        </Box>
    )
}
