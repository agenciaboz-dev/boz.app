import React from "react"
import { Box } from "@mui/material"
import { CustomerList } from "../Admin/Customers/CustomerList"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { Route, Routes } from "react-router-dom"
import { Profile } from "./Profile"

interface CustomersProps {
    user: User
}

export const Customers: React.FC<CustomersProps> = ({ user }) => {
    return (
        <Box sx={backgroundStyle}>
            <Header user={user} />
            <Box sx={{ flexDirection: "column", padding: "2vw", overflowY: "auto", height: "87vh" }}>
                <Routes>
                    <Route index element={<CustomerList />} />
                    <Route path="/:id" element={<Profile />} />
                </Routes>
            </Box>
        </Box>
    )
}
