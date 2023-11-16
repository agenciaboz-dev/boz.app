import React, { useState } from "react"
import { Box, Paper, Tooltip } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import AddIcon from "@mui/icons-material/Add"
import formatDate from "../../tools/formatDate"

interface MeetingContainerProps {
    meeting: Event
}

export const MeetingContainer: React.FC<MeetingContainerProps> = ({ meeting }) => {
    const size = "0.5vw"
    const colors = useColors()
    const self = meeting.attendees?.find((item) => item.self)
    const startTime = new Date(meeting.start.dateTime as string).toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
    })

    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const { monthName } = formatDate

    const handleOpenModal = () => {
        setOpenModal(true)
        setOpen(false)

        return open
    }
    const handleCloseModal = () => setOpenModal(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const getDateSplit = (date: string) => {
        const dateTime = new Date(date) // Converte a string de data e hora para um objeto Date

        const day = dateTime.getUTCDate() // Dia em UTC
        const month = dateTime.getUTCMonth() + 1 // Mês em UTC (adiciona 1 porque Janeiro é 0)
        const year = dateTime.getUTCFullYear() // Ano em UTC

        console.log(`Dia: ${day}, Mês: ${month}, Ano: ${year}`)

        return (
            <p>
                {day} de {monthName(month)}, {year}
            </p>
        )
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                gap: "0.3vw",
                padding: "0.3vw 0.3vw",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            <Box
                sx={{
                    width: size,
                    height: size,
                    borderRadius: "100%",
                    outline: `1px solid ${self?.responseStatus == "accepted" ? colors.success : ""}`,
                    bgcolor: self?.responseStatus == "accepted" ? colors.success : "",
                }}
            />
            <p style={{ fontSize: "0.55vw" }}>{startTime}</p>

            <Tooltip
                title={
                    <Paper
                        elevation={4}
                        sx={{
                            height: "12vw",
                            width: "20vw",
                            borderRadius: "0 2vw 0",
                            padding: 2.5,
                            bgcolor: "secondary",
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                                justifyContent: "space-between  ",
                            }}
                        >
                            <Box
                                sx={{
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflowX: "hidden",
                                    }}
                                >
                                    <Tooltip title={meeting.summary} arrow>
                                        <p
                                            style={{
                                                fontWeight: "800",
                                                fontSize: "1.2vw",
                                                color: colors.secondary,
                                                width: "97%",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {meeting.summary}
                                        </p>
                                    </Tooltip>
                                </Box>
                                <p style={{ fontSize: "0.8vw", color: colors.secondary }}>
                                    {getDateSplit(String(meeting.start.date))}
                                    {/* {meeting.start.dateTime} */}
                                </p>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "17vw",
                                    maxHeight: "6vw",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.9vw",
                                        height: "3vw",
                                        color: colors.secondary,
                                        textAlign: "justify",

                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        cursor: "pointer",
                                    }}
                                >
                                    {meeting.description}
                                </p>
                            </Box>
                            <Box sx={{ alignItems: "center", gap: "0.2vw", justifyContent: "flex-end" }}>
                                <AddIcon color="secondary" />
                                <p
                                    style={{
                                        textAlign: "end",
                                        color: colors.secondary,
                                        cursor: "pointer",
                                        fontSize: "0.8vw",
                                        fontWeight: "400",
                                    }}
                                    onClick={() => {
                                        handleOpenModal()
                                    }}
                                >
                                    Mais informações
                                </p>
                            </Box>
                        </Box>
                    </Paper>
                }
                slotProps={{ tooltip: { sx: { bgcolor: "transparent", p: 0 } }, arrow: { sx: { color: colors.primary } } }}
                placement="bottom"
                arrow
            >
                <p
                    style={{ color: isHovered ? colors.secondary : colors.text.terciary }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {meeting.summary}
                </p>
            </Tooltip>
        </Box>
    )
}
