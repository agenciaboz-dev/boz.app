import React from "react"
import { Box, Switch } from "@mui/material"
import { useApi } from "../hooks/useApi"
import { Tag } from "./Tag"
import { useColors } from "../hooks/useColors"

interface CustomerContainerProps {
    customer: Customer
}

export const CustomerContainer: React.FC<CustomerContainerProps> = ({ customer }) => {
    const api = useApi()
    const colors = useColors()

    const toggleCustomerStatus = (customer: Customer) => {
        api.customer.toggleStatus({
            data: customer,
            callback: () => {},
        })
    }

    return (
        <Box sx={{ borderBottom: "2px solid", borderRadius: "0.5vw", padding: "1vw", width: "46vw" }}>
            <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
                    <Switch color={"success"} checked={customer.active} onChange={() => toggleCustomerStatus(customer)} />
                    <p style={{ fontWeight: "bold" }}>{customer.name}</p>
                </Box>
                <p style={{ color: colors.text.secondary }}>{customer.recomendations}</p>
            </Box>

            <Box sx={{ alignItems: "center", marginLeft: "auto", gap: "0.5vw" }}>
                {customer.services.map((service) => (
                    <Tag key={service.id} name={service.tag} fontSize="0.8vw" />
                ))}
            </Box>
        </Box>
    )
}
