import React from "react"
import { Box } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"

interface ChatContainerProps {
    user: User
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
    return (
        <ContainerWrapper>
            <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Chatzinho aqui</Box>
        </ContainerWrapper>
    )
}
