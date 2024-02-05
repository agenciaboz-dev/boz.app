import React, { useCallback, useEffect, useState } from "react"
import { Box, MenuItem, Paper, useMediaQuery } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { CustomerContainer } from "../../../components/CustomerContainer"
import { useSearch } from "../../../hooks/useSearch"
import normalize from "../../../tools/normalize"
import { Services } from "./Services"
import { useUser } from "../../../hooks/useUser"
import { NewButton } from "../../../components/NewButton"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import colors from "../../../style/colors"
import { useColors } from "../../../hooks/useColors"

interface CustomerListProps {}

export const CustomerList: React.FC<CustomerListProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { customers } = useCustomers()
    const { setOnSearch } = useSearch()
    const { isAdmin } = useUser()
    const colors = useColors()

    const [customerList, setCustomerList] = useState(customers)

    const handleSearch = useCallback(
        (value: string) => {
            const result = customers.filter((customer) => normalize(customer.name).includes(normalize(value)))
            setCustomerList(result)
        },
        [customers]
    )

    useEffect(() => {
        setCustomerList(customers)
    }, [customers])

    useEffect(() => {
        setOnSearch(() => handleSearch, "clientes")
    }, [])

    return (
        <Box sx={{ flexDirection: "column", gap: isMobile ? "10vw" : "2vw" }}>
            {isAdmin() && <Services />}
            {isAdmin() && (
                <NewButton
                    onClick={() => navigate("/customers/new")}
                    bottom={"2vw"}
                    right={"2vw"}
                    icon={<AddIcon sx={{ width: "100%", height: "100%" }} />}
                />
            )}
            <Box
                sx={{
                    bgcolor: "background.default",
                    flexDirection: "column",
                    padding: isMobile ? "5vw" : "0vw",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "6vw" : "1.3vw",
                        textAlign: isMobile ? "center" : "start",
                        color: colors.text.primary,
                    }}
                >
                    Clientes
                </p>
                <Box sx={{ justifyContent: "space-between", flexWrap: "wrap", width: "100%", gap: isMobile ? "12vw" : "1vw" }}>
                    {customerList
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .map((customer) => (
                            <CustomerContainer key={customer.id} customer={customer} />
                        ))}
                </Box>
            </Box>
        </Box>
    )
}
