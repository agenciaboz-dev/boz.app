import React, { useState } from "react"
import { Box, Tab, Tabs } from "@mui/material"
import { Header } from "../../components/Header"
import { Route, Routes, useLocation } from "react-router-dom"
import { Users } from "./Users"
import { tabStyle } from "../../style/tab"
import { useAdminTabs } from "../../hooks/useAdminTabs"
import { Customers } from "./Customers"
import { Deparments } from "./Departments"
import { Stats } from "./Stats"

interface AdminProps {
    user: User
}

export const Admin: React.FC<AdminProps> = ({ user }) => {
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
            <Routes>
                <Route index element={<Users user={user} />} />
                <Route path="/users/*" element={<Users user={user} />} />
                <Route path="/customers/*" element={<Customers user={user} />} />
                <Route path="/departments/*" element={<Deparments user={user} />} />
                <Route path="/stats/*" element={<Stats user={user} />} />
            </Routes>
        </Box>
    )
}
