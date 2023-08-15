import React, { useEffect, useState } from "react"
import { Box, MenuItem, Paper } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { CustomerContainer } from "../../../components/CustomerContainer"
import { useSearch } from "../../../hooks/useSearch"

interface CustomerListProps {}

export const CustomerList: React.FC<CustomerListProps> = ({}) => {
    const { customers } = useCustomers()
    const { setOnSearch } = useSearch()

    const [customerList, setCustomerList] = useState(customers)

    const handleSearch = (value: string) => {
        const result = customers.filter((customer) => customer.name.toLowerCase().includes(value.toLowerCase()))
        setCustomerList(result)
    }

    useEffect(() => {
        setCustomerList(customers)
    }, [customers])

    useEffect(() => {
        setOnSearch(() => handleSearch, "clientes")
    }, [])

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: "0.3vw 3vw 0",
                backgroundColor: "background.default",
                width: "100%",
                height: "20vw",
                flexDirection: "column",
                padding: "1vw 4vw",
                gap: "1vw",
            }}
        >
            <p style={{ fontWeight: "bold", fontSize: "1.2vw" }}>Clientes</p>
            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                {customerList
                    .sort((a, b) => a.id - b.id)
                    .map((customer) => (
                        <CustomerContainer key={customer.id} customer={customer} />
                    ))}
            </Box>
        </Paper>
    )
}
