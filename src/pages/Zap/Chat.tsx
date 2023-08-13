import React from "react"
import { Avatar, Badge, Box, MenuItem, Paper } from "@mui/material"
import { useZap } from "../../hooks/useZap"
import { useFormatMessageTime } from "../../hooks/useFormatMessageTime"

interface ChatProps {
    chat: Chat
    onChatClick: (chat: Chat) => void
}

export const Chat: React.FC<ChatProps> = ({ chat, onChatClick }) => {
    const { drawer } = useZap()
    const formatTime = useFormatMessageTime()

    const handleClick = () => {
        drawer.toogle()
        onChatClick(chat)
    }

    return (
        <MenuItem
            // elevation={3}
            sx={{
                padding: "1vw",
                backgroundColor: "background.default",
                alignItems: "center",
                gap: "1vw",
                height: "5vw",
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
            <Avatar src={chat.profilePic} sx={{ width: "3vw", height: "3vw", bgcolor: "primary.main" }} />
            <Box
                sx={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    overflow: "hidden",
                    color: "primary.main",
                    width: "13vw",
                    fontSize: "0.8vw",
                }}
            >
                <p style={{ fontWeight: "bold", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{chat.name}</p>
                <Box color="text.secondary">
                    <p
                        style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "19vw", overflow: "hidden", fontSize: "0.8vw" }}
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
                    justifyContent: "space-between",
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
                            borderRadius: "1vw",
                            padding: "0.3vw",
                            fontSize: "0.7vw",
                            fontWeight: "bold",
                            minWidth: "1.5vw",
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
