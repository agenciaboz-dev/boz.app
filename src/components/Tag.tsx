import React from "react"
import { Box, SxProps, Tooltip, alpha, darken, lighten } from "@mui/material"
import { useColors } from "../hooks/useColors"
import { useDarkMode } from "../hooks/useDarkMode"

interface TagProps {
    name: string
    tooltip: string
    sx?: SxProps
    fontSize?: string
    variant?: string
    color?: string
    onClick?: () => void
}

export const Tag: React.FC<TagProps> = ({ name, tooltip, fontSize, sx, color, onClick, variant = "default" }) => {
    const colors = useColors()
    const { darkMode } = useDarkMode()

    return (
        <Tooltip title={tooltip} enterDelay={0} placement="bottom-start">
            <Box
                sx={{
                    fontSize: `${fontSize}`,
                    width: "max-content",
                    backgroundColor: color || (darkMode ? darken(colors.primary, 0.4) : lighten(colors.primary, 0.4)),
                    borderRadius: "7vw",
                    padding: "0.5vw",
                    color: colors.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "default",

                    "&: hover": onClick
                        ? {
                              transition: "0.2s",
                              cursor: "pointer",
                              bgcolor: "primary.main",
                          }
                        : {},

                    ...sx,
                }}
                onClick={() => {
                    if (onClick) onClick()
                }}
            >
                {name}
            </Box>
        </Tooltip>
    )
}
