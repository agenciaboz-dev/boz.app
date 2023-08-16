import React from "react"
import { Box } from "@mui/material"
import { Services } from "./Services"
import { NewButton } from "../../../components/NewButton"
import AddIcon from "@mui/icons-material/Add"
import { Route, Routes, useNavigate } from "react-router-dom"
import { NewCustomer } from "./NewCustomer"
import { CustomerList } from "./CustomerList"
import { useCustomers } from "../../../hooks/useCustomers"
import { Profile } from "../../Customers/Profile"

interface CustomersProps {
    user: User
}

export const Customers: React.FC<CustomersProps> = ({ user }) => {
    const navigate = useNavigate()

    const handleNewCustomer = () => {
        navigate("/admin/customers/new")
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
                bgcolor: "background.default",
                padding: "2vw",
                gap: "2vw",
                overflowY: "auto",
                height: "80vh",
            }}
        >
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <NewButton
                                onClick={handleNewCustomer}
                                bottom={"2vw"}
                                right={"3vw"}
                                icon={<AddIcon sx={{ width: "100%", height: "100%" }} />}
                            />
                            <Services />
                            <CustomerList />
                        </>
                    }
                />
                <Route path="/new" element={<Profile createOnly />} />
            </Routes>
        </Box>
    )
}
