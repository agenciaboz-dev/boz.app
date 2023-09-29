import React, { useState } from "react"
import { Box, Tab, Tabs, useMediaQuery } from "@mui/material"
import { Header } from "../../components/Header"
import { Route, Routes, useLocation } from "react-router-dom"
import { Users } from "./Users"
import { Customers } from "./Customers"
import { Deparments } from "./Departments"
import { Stats } from "./Stats"

interface AdminProps {
    user: User
}

export const Admin: React.FC<AdminProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                bgcolor: "background.default",
                overflow: "hidden",
            }}
        >
            <Header user={user} />
            <Box sx={{ flexDirection: "column", overflowY: "auto", height: isMobile? "90vh" : "87vh" }} >
                <Routes>
                    <Route index element={<Users user={user} />} />
                    <Route path="/users/*" element={<Users user={user} />} />
                    <Route path="/customers/*" element={<Customers user={user} />} />
                    <Route path="/departments/*" element={<Deparments user={user} />} />
                    <Route path="/stats/*" element={<Stats user={user} />} />
                </Routes>
            </Box>
        </Box>
    )
}
