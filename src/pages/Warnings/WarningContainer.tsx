import React, { useEffect, useState } from "react"
import { Box, CircularProgress, IconButton, useMediaQuery } from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { useIo } from "../../hooks/useIo"
import { UsersToolip } from "../Profile/UsersTooltip"
import { useUser } from "../../hooks/useUser"

interface WarningContainerProps {
    user: User
    warning: Warning
}

export const WarningContainer: React.FC<WarningContainerProps> = ({ warning, user }) => {
    const isMobile = useMediaQuery("orientation: portrait")
    const io = useIo()

    const { isAdmin, list: users } = useUser()

    const [confirming, setConfirming] = useState(false)

    const confirmed = warning.confirmed.find((item) => item.id == user.id)

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
            <Box sx={{ justifyContent: "space-between" }}>
                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                    <h3>{warning.title}</h3>
                </Box>

                <Box sx={{ alignItems: "center", gap: "1vw" }}>
                    <p>
                        {warning.creator.name.split(" ")[0]} - {new Date(Number(warning.date)).toLocaleString("pt-br")}
                    </p>

                    {isAdmin() && (
                        <UsersToolip users={users.filter((item) => !warning.confirmed.some((confirmedUser) => confirmedUser.id == item.id))}>
                            <IconButton color={"error"}>
                                <ThumbDownIcon />
                            </IconButton>
                        </UsersToolip>
                    )}

                    <UsersToolip users={warning.confirmed}>
                        <IconButton color={confirmed ? "success" : "warning"} onClick={handleConfirm}>
                            {confirming ? <CircularProgress size="1.5rem" color="warning" /> : <ThumbUpIcon />}
                        </IconButton>
                    </UsersToolip>
                </Box>
            </Box>

            <Box sx={{ flexDirection: "column", gap: "0.3vw", color: "text.secondary", padding: "0 1vw" }}>
                {warning.text.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                ))}
            </Box>
        </Box>
    )
}
