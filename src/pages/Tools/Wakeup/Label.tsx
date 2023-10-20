import React from "react"
import { AlertColor, Box } from "@mui/material"

interface LabelProps {
    label: string
    color: AlertColor
}

export const Label: React.FC<LabelProps> = ({ label, color }) => {
    return (
        <Box
            sx={{
                bgcolor: `${color}.main`,
                fontSize: "1vw",
                padding: "0.2vw 1vw",
                borderRadius: "1vw",
                color: "white",
                fontWeight: "bold",
            }}
        >
            {label}
        </Box>
    )
}
