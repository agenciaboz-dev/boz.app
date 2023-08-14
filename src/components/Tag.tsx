import React from "react"
import { Box, alpha, darken, lighten } from "@mui/material"
import { useColors } from "../hooks/useColors"
import { useDarkMode } from "../hooks/useDarkMode"

interface TagProps {
    name: string
    fontSize?: string
    variant?: string
}

export const Tag: React.FC<TagProps> = ({ name, fontSize, variant = "default" }) => {
    const colors = useColors()
    const { darkMode } = useDarkMode()

    return (
        <Box
            sx={{
                fontSize: `${fontSize}`,
                width: "max-content",
                backgroundColor: darkMode ? darken(colors.primary, 0.4) : lighten(colors.primary, 0.4),
                //backgroundColor: `${colors[variant]}`,
                borderRadius: "7vw",
                padding: "0.5vw",
                color: colors.secondary,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {name}
        </Box>
    )
}
