import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { CustomerList } from "../Admin/Customers/CustomerList"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { Route, Routes } from "react-router-dom"
import { Profile } from "./Profile"

interface CustomersProps {
    user: User
}

export const Customers: React.FC<CustomersProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ flexDirection: "column", padding: isMobile? "5vw" : "2vw", overflowY: "auto", height: isMobile? "90vh" : "87vh" }}>
                <Routes>
                    <Route index element={<CustomerList />} />
                    <Route path="/:id" element={<Profile />} />
                    <Route path="/new" element={<Profile createOnly />} />
                </Routes>
            </Box>
        </Box>
    )
}
