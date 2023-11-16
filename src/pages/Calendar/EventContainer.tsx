import React, { useState } from "react"
import { Box, Button, Dialog, DialogContent, IconButton, Modal, Paper, Popper, Tooltip, Typography } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import formatDate from "../../tools/formatDate"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"

interface EventContainerProps {
    event: Event
}

export const EventContainer: React.FC<EventContainerProps> = ({ event }) => {
    const colors = useColors()
    const { monthName } = formatDate
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
        setOpen(false)

        return open
    }
    const handleCloseModal = () => setOpenModal(false)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [isHovered, setIsHovered] = useState(false)

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
                                    <Tooltip title={event.summary}>
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
                                            {event.summary}
                                        </p>
                                    </Tooltip>
                                </Box>
                                <p style={{ fontSize: "0.8vw", color: colors.secondary }}>
                                    {getDateSplit(String(event.start.date))}
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
                                    {event.description}
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
                    style={{
                        cursor: "pointer",
                        color: isHovered ? colors.primary : colors.text.secondary,
                        width: "97%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }}
                    // onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {event.summary}
                </p>
            </Tooltip>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ alignItems: "center", justifyContent: "center" }}
            >
                <Paper
                    sx={{
                        width: "40%",
                        height: "90%",
                        p: "1.5vw",
                        bgcolor: colors.background.primary,
                        borderRadius: "0 3vw",
                        flexDirection: "column",
                        gap: "1vw",
                    }}
                >
                    <Box sx={{ flexDirection: "column" }}>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleCloseModal}>
                            <CloseIcon color="primary" />
                        </IconButton>
                        <Box sx={{ flexDirection: "row", width: "100%" }}>
                            <Box sx={{ flexDirection: "column" }}>
                                <p
                                    style={{
                                        fontWeight: "800",
                                        fontSize: "1.3vw",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        color: colors.primary,
                                        width: "100%",
                                    }}
                                >
                                    {event.summary}
                                </p>
                                <p style={{ fontSize: "0.8vw", color: colors.primary }}>
                                    {getDateSplit(String(event.start.date))}
                                </p>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: "justify", width: "100%", heigth: "8vw", overflowY: "auto" }}>
                        {event.description}
                    </Box>
                </Paper>
            </Modal>
        </Box>
    )
}
