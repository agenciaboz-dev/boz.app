import React, { useEffect, useState } from "react"
import { Badge, Box, CircularProgress, IconButton, useMediaQuery } from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { useIo } from "../../hooks/useIo"
import { UsersToolip } from "../Profile/UsersTooltip"
import { useUser } from "../../hooks/useUser"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

interface WarningContainerProps {
    user: User
    warning: Warning
}

export const WarningContainer: React.FC<WarningContainerProps> = ({ warning, user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const io = useIo()

    const { isAdmin, list: users } = useUser()

    const [confirming, setConfirming] = useState(false)

    const confirmed = warning.confirmed.find((item) => item.id == user.id)

    const unconfirmedUsers = users.filter((item) => !warning.confirmed.some((confirmedUser) => confirmedUser.id == item.id))

    const handleConfirm = () => {
        if (confirmed) return

        setConfirming(true)
        io.emit("warning:confirm", { id: user.id, warning })
    }

    useEffect(() => {
        io.on("warning:confirm:success", () => {
            setConfirming(false)
        })

        io.on("warning:confirm:error", () => {
            setConfirming(false)
        })

        return () => {
            io.off("warning:confirm:error")
            io.off("warning:confirm:success")
        }
    }, [])

    return (
        <Box
            sx={{
                gap: isMobile ? "3vw" : "0.5vw",
                color: "primary.main",
                borderRadius: isMobile ? "3vw" : "0.5vw",
                borderBottom: "2px solid",
                padding: isMobile ? "3vw" : "1vw 0.5vw",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
                    flexDirection: isMobile? "column" : "row",
                    flexWrap: "wrap",
                    gap: 0,
                }}
                >
                <Box
                    sx={{
                        alignItems: "center",
                        gap: "0.5vw",
                        flexWrap: isMobile? "wrap" : "nowrap",
                    }}
                >
                    <h3>{warning.title}</h3>
                </Box>

                <Box
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                    >
                    <p>
                        {warning.creator.name.split(" ")[0]} - {new Date(Number(warning.date)).toLocaleString("pt-br")}
                    </p>

                    <Box
                        sx={{
                            gap: isMobile? 0 : "1vw",
                        }}
                    >
                        {isAdmin() && (
                            <UsersToolip users={unconfirmedUsers}>
                                <Badge badgeContent={unconfirmedUsers.length} color="error">
                                    <IconButton color={"error"}>
                                        <VisibilityOffIcon />
                                    </IconButton>
                                </Badge>
                            </UsersToolip>
                        )}
                        <UsersToolip users={warning.confirmed}>
                            <Badge badgeContent={warning.confirmed.length} color="success">
                                <IconButton color={confirmed ? "success" : "warning"} onClick={handleConfirm}>
                                    {confirming ? <CircularProgress size="1.5rem" color="warning" /> : <ThumbUpIcon />}
                                </IconButton>
                            </Badge>
                        </UsersToolip>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ flexDirection: "column", gap: isMobile? "3vw" : "0.3vw", color: "text.secondary", padding: isMobile? "0" : "0 1vw", textAlign: "justify" }}>
                {warning.text.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </Box>
        </Box>
    )
}
