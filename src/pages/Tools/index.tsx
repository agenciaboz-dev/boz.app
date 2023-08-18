import React from "react"
import { Box } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { QrCodeGenerator } from "./QrCodeGenerator"
import { Route, Routes } from "react-router-dom"

interface ToolsProps {
    user: User
}

export const Tools: React.FC<ToolsProps> = ({ user }) => {
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Routes>
                <Route path="/qrcode" element={<QrCodeGenerator user={user} />} />
            </Routes>
        </Box>
    )
}
