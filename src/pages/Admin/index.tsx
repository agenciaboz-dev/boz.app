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
    const tabs = useAdminTabs()
    const path = useLocation().pathname
    const initialTab = tabs.find((item) => item.path == path.split("/admin")[1])

    const [tab, setTab] = useState(initialTab?.id || 1)

    const handleTabChange = (id: number) => {
        setTab(id)

        const tab = tabs.find((tab) => tab.id == id)
        tab?.onClick()
    }

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
            <Tabs value={tab} onChange={(_, id) => handleTabChange(id)} centered variant="fullWidth">
                {tabs.map((tab) => {
                    const Icon = () => tab.icon
                    return <Tab key={tab.id} label={tab.name} value={tab.id} sx={tabStyle} icon={<Icon />} />
                })}
            </Tabs>
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
