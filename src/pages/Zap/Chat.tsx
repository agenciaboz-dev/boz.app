import React from "react"
import { Avatar, Badge, Box, MenuItem, Paper } from "@mui/material"
import { useZap } from "../../hooks/useZap"
import { useFormatMessageTime } from "../../hooks/useFormatMessageTime"
import { usePictureModal } from "../../hooks/usePictureModal"
import { useMediaQuery } from "@mui/material"

interface ChatProps {
    chat: Chat
    onChatClick: (chat: Chat) => void
}

export const Chat: React.FC<ChatProps> = ({ chat, onChatClick }) => {
    const isMobile = useMediaQuery({orientation: "portrait"})
    const formatTime = useFormatMessageTime()
    const picture = usePictureModal()
    const { drawer } = useZap()

    const handleClick = () => {
        drawer.toogle()
        onChatClick(chat)
    }

    return (
        <MenuItem
            // elevation={3}
            sx={{
                padding: isMobile ? "2vw 0" : "1vw",
                backgroundColor: "background.default",
                alignItems: "center",
                gap: isMobile ? "3vw" : "1vw",
                height: isMobile ? "20vw" : "5vw",
                cursor: "pointer",
                borderRadius: "0.5vw",
                borderBottom: "2px solid",
                // borderRight: "1px solid",
                // boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.2)",

                "&:hover": {
                    // outline: "2px solid",
                },
            }}
            onClick={handleClick}
        >
            <Avatar
                src={chat.profilePic}
                sx={{ width: isMobile ? "12vw" : "3vw", height: isMobile ? "12vw" : "3vw", bgcolor: "primary.main" }}
                onClick={() => picture.open(chat?.profilePic || "")}
            />
            <Box
                sx={{
                    flexDirection: "column",
                    justifyContent: isMobile ? "center" : "space-between",
                    height: "100%",
                    overflow: "hidden",
                    color: "primary.main",
                    width: isMobile ? "66vw" : "13vw",
                    fontSize: isMobile ? "4vw" : "0.8vw",
                }}
            >
                <p style={{ fontWeight: "bold", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{chat.name}</p>
                <Box color="text.secondary">
                    <p
                        style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: isMobile ? "100%" : "19vw", overflow: "hidden", fontSize: isMobile ? "4vw" : "0.8vw" }}
                        title={chat.lastMessage?.body}
                    >
                        {chat.lastMessage?.body}
                    </p>
                </Box>
            </Box>
            <Box
                sx={{
                    marginLeft: "auto",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: isMobile ? "space-around" : "space-between",
                    height: "100%",
                    color: "primary.main",
                }}
            >
                <p style={{ fontSize: "0.6vw" }}>{formatTime(new Date(chat.lastMessage?.timestamp * 1000))}</p>
                {!!chat.unreadCount && (
                    <Box
                        color={"secondary.main"}
                        sx={{
                            bgcolor: "warning.main",
                            borderRadius: "50%",
                            padding: "0.3vw",
                            fontSize: isMobile ? "4vw" : "0.7vw",
                            fontWeight: "bold",
                            minWidth: isMobile ? "8vw" : "1.5vw",
                            height: isMobile ? "8vw" : "1.5vw",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {chat.unreadCount}
                    </Box>
                )}
            </Box>
        </MenuItem>
    )
}
