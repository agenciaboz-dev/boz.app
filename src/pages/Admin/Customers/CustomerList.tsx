import React, { useCallback, useEffect, useState } from "react"
import { Box, Grid, MenuItem, Paper, SxProps, useMediaQuery } from "@mui/material"
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
import { Tag } from "../../../components/Tag"

interface CustomerListProps {}

export const CustomerList: React.FC<CustomerListProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { customers } = useCustomers()
    const { setOnSearch } = useSearch()
    const { isAdmin } = useUser()
    const colors = useColors()

    const [customerList, setCustomerList] = useState(customers)

    const tag_style: SxProps = { height: "1.5vw", fontSize: "0.8rem", fontWeight: "bold" }

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
                <Box sx={{ gap: "1vw", alignItems: "center" }}>
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
                    <Tag
                        name={customers.filter((customer) => customer.active).length.toString()}
                        tooltip="ativos"
                        color="success.main"
                        sx={tag_style}
                    />
                    <Tag
                        name={customers.filter((customer) => !customer.active).length.toString()}
                        tooltip="inativos"
                        color="error.main"
                        sx={tag_style}
                    />
                    <Tag name={customers.length.toString()} tooltip="total" color="warning.main" sx={tag_style} />
                </Box>
                <Grid container columns={3} spacing={3}>
                    {customerList
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .map((customer) => (
                            <Grid item xs={1} key={customer.id}>
                                <CustomerContainer key={customer.id} customer={customer} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </Box>
    )
}
