import React, { useState } from "react"
import { Box, Button, Dialog, DialogContent, Paper, Popper, Typography } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import formatDate from "../../tools/formatDate"

interface EventContainerProps {
    event: Event
}

export const EventContainer: React.FC<EventContainerProps> = ({ event }) => {
    const colors = useColors()
    const { monthName } = formatDate
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const open = Boolean(anchorEl)
    const id = open ? "simple-popper" : undefined

    const arrowRef = React.useRef<HTMLDivElement | null>(null)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const getDateSplit = (date: string) => {
        const parts = date.split("-") // Divide a data em partes
        const year = parts[0]
        const month = Number(parts[1]) - 1
        const day = parts[2]

        return (
            <p>
                {day} de {monthName(Number(month))}, {year}
            </p>
        )
    }

    return (
        <Box>
            <p
                style={{
                    cursor: "pointer",
                    color: isHovered ? colors.primary : "black",
                }}
                aria-describedby={id}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {event.summary}
            </p>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                disablePortal={false}
                placement="right"
                modifiers={[
                    {
                        name: "flip",
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: "document",
                            padding: 8,
                        },
                    },
                    {
                        name: "preventOverflow",
                        enabled: true,
                        options: {
                            altAxis: false,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: "document",
                            padding: 8,
                        },
                    },
                    {
                        name: "arrow",
                        enabled: true,
                        options: {
                            element: arrowRef.current,
                        },
                    },
                ]}
            >
                <Paper
                    elevation={4}
                    sx={{ height: "12vw", width: "20vw", borderRadius: "0 2vw 0", p: 2.5, bgcolor: "secondary" }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: "0.9vw",
                            width: "17vw",
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "0.5vw",
                            }}
                        >
                            <Box
                                sx={{ display: "flex", whiteSpace: "nowrap", textOverflow: "ellipsis", overflowX: "hidden" }}
                            >
                                <p style={{ fontWeight: "800", color: colors.secondary }}>{event.summary}</p>
                            </Box>
                            <p style={{ fontSize: "0.8vw", color: colors.secondary }}>
                                {getDateSplit(String(event.start.date))}
                            </p>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                width: "17vw",
                                height: "5vw",
                                flexWrap: "wrap",
                                maxHeight: "3vw",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <p style={{ fontSize: "0.9vw", color: colors.secondary, textAlign: "justify" }}>
                                {event.description}
                            </p>
                        </Box>
                        <p
                            style={{
                                textAlign: "end",
                                color: colors.secondary,
                                cursor: "pointer",
                                fontSize: "0.8vw",
                                fontWeight: "400",
                            }}
                        >
                            Mais informações
                        </p>
                    </Box>
                </Paper>
            </Popper>
        </Box>
    )
}
