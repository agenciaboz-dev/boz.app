import React from "react"
import { Box, SxProps, alpha, darken, lighten } from "@mui/material"
import { useColors } from "../hooks/useColors"
import { useDarkMode } from "../hooks/useDarkMode"

interface TagProps {
    name: string
    tooltip: string
    sx?: SxProps
    fontSize?: string
    variant?: string
    color?: string
}

export const Tag: React.FC<TagProps> = ({ name, tooltip, fontSize, sx, color, variant = "default" }) => {
    const colors = useColors()
    const { darkMode } = useDarkMode()

    return (
        <Box
            title={tooltip}
            sx={{
                fontSize: `${fontSize}`,
                width: "max-content",
                backgroundColor: color || (darkMode ? darken(colors.primary, 0.4) : lighten(colors.primary, 0.4)),
                borderRadius: "7vw",
                padding: "0.5vw",
                color: colors.secondary,
                justifyContent: "center",
                alignItems: "center",
                ...sx,
            }}
        >
            {name}
        </Box>
    )
}
