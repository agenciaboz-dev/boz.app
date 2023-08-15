import React from "react"
import { Avatar, Box, Switch, alpha } from "@mui/material"
import { useApi } from "../hooks/useApi"
import { Tag } from "./Tag"
import { useColors } from "../hooks/useColors"
import { useMuiTheme } from "../hooks/useMuiTheme"

interface CustomerContainerProps {
    customer: Customer
}

export const CustomerContainer: React.FC<CustomerContainerProps> = ({ customer }) => {
    const api = useApi()
    const colors = useColors()
    const theme = useMuiTheme()

    const toggleCustomerStatus = (customer: Customer) => {
        api.customer.toggleStatus({
            data: customer,
            callback: () => {},
        })
    }

    return (
        <Box
            sx={{
                borderBottom: "2px solid",
                borderRadius: "0.5vw",
                padding: "1vw",
                width: "30vw",
                // bgcolor: customer.active ? "background.default" : alpha(theme.palette.error.main, 0.25),
                color: customer.active ? "primary.main" : "error.main",
                gap: "1vw",
                position: "relative",
            }}
        >
            <Switch
                color={"success"}
                checked={customer.active}
                onChange={() => toggleCustomerStatus(customer)}
                sx={{ position: "absolute", right: "0.5vw", top: "0.5vw" }}
            />
            <Avatar sx={{ width: "5vw", height: "5vw" }} variant="rounded" />
            <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "1vw" }}>{customer.name}</p>
                </Box>
                <p style={{ color: colors.text.secondary, fontSize: "0.75vw", width: "20vw" }}>{customer.recomendations}</p>
                <Box sx={{ alignItems: "center", gap: "0.5vw", width: "20vw", flexWrap: "wrap" }}>
                    {customer.services.map((service) => (
                        <Tag
                            key={service.id}
                            name={service.tag}
                            sx={{ fontSize: "0.7vw", padding: "0.25vw 0.5vw" }}
                            color={customer.active ? "" : theme.palette.error.main}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
