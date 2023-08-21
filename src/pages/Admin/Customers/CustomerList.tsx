import React, { useEffect, useState } from "react"
import { Box, MenuItem, Paper } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { CustomerContainer } from "../../../components/CustomerContainer"
import { useSearch } from "../../../hooks/useSearch"
import normalize from "../../../tools/normalize"
import { Services } from "./Services"
import { useUser } from "../../../hooks/useUser"

interface CustomerListProps {}

export const CustomerList: React.FC<CustomerListProps> = ({}) => {
    const { customers } = useCustomers()
    const { setOnSearch } = useSearch()
    const { isAdmin } = useUser()

    const [customerList, setCustomerList] = useState(customers)

    const handleSearch = (value: string) => {
        const result = customers.filter((customer) => normalize(customer.name).includes(value))
        setCustomerList(result)
    }

    useEffect(() => {
        setCustomerList(customers)
    }, [customers])

    useEffect(() => {
        setOnSearch(() => handleSearch, "clientes")
    }, [])

    return (
        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
            {isAdmin() && <Services />}
            <Paper sx={{ bgcolor: "background.default", flexDirection: "column", padding: "1vw", gap: "1vw" }}>
                <p style={{ fontWeight: "bold" }}>Clientes</p>
                <Box sx={{ justifyContent: "space-between", flexWrap: "wrap", width: "100%", gap: "1vw" }}>
                    {customerList
                        .sort((a, b) => a.id - b.id)
                        .map((customer) => (
                            <CustomerContainer key={customer.id} customer={customer} />
                        ))}
                </Box>
            </Paper>
        </Box>
    )
}
