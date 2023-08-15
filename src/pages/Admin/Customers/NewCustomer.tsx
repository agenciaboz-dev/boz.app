import React, { useState } from "react"
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Avatar,
    alpha,
} from "@mui/material"
import { Form, Formik } from "formik"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
import { textFieldStyle } from "../../../style/textfield"
import { useCustomers } from "../../../hooks/useCustomers"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { useColors } from "../../../hooks/useColors"
interface NewCustomerProps {}

export const NewCustomer: React.FC<NewCustomerProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()
    const colors = useColors()

    const { services } = useCustomers()

    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(false)

    const initialValues: CustomerForm = {
        name: "",
        recomendations: "",
    }

    const handleSubmit = (values: CustomerForm) => {
        if (loading) return

        setLoading(true)

        const data = {
            ...values,
            services: selectedServices,
        }

        api.customer.new({
            data,
            callback: (response: { data: Customer }) => {
                const customer = response.data
                if (customer) navigate("/admin/customers")
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const handleServiceSelect = (child: any) => {
        const id = child.props.value as Number
        const service = services.find((item) => item.id == id) as Service

        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((item) => item.id != service.id))
        } else {
            setSelectedServices([...selectedServices, service])
        }
    }

    return (
        <Box sx={{ padding: "0vw 0vw", flexDirection: "column" }}>
            <Box
                sx={{ backgroundColor: "background.paper", borderRadius: "0.3vw 3vw 0 3vw", height: "75%", width: "100%" }}
            ></Box>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: "0.3vw 3vw 0",
                    backgroundColor: "background.default",
                    width: "100%",
                    flexDirection: "column",
                    height: "35vw",
                    gap: "1vw",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        gap: "5vw",
                        padding: "3vw",
                        background: colors.secondary,
                        boxShadow: `0px 2px 35px ${alpha(colors.text.secondary, 0.3)}`,
                        borderRadius: "0.5vw",
                        alignSelf: "center",
                        alignItems: "center",
                        width: "80%",
                        height: "max-content",
                        position: "fixed",
                        top: "18vw",
                    }}
                >
                    <Avatar
                        src={""}
                        variant="rounded"
                        sx={{
                            width: "21vw",
                            height: "21vw",
                            // position: "fixed",
                            // top: "15vw",
                        }}
                    />
                    <Box sx={{ flexDirection: "column", width: "62%", gap: "4.9vw", height: "100%" }}>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, handleChange }) => (
                                <Form>
                                    <Box
                                        sx={{
                                            flexDirection: "column",
                                            width: "100%",
                                            gap: "2vw",
                                            height: "100%",
                                        }}
                                    >
                                        <TextField
                                            label="Nome"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            sx={textFieldStyle}
                                        />
                                        <TextField
                                            label="Recomendações"
                                            name="recomendations"
                                            value={values.recomendations}
                                            onChange={handleChange}
                                            sx={textFieldStyle}
                                        />
                                        <Select
                                            label="Serviços"
                                            name="services"
                                            multiple
                                            value={selectedServices}
                                            onChange={(_, child) => handleServiceSelect(child)}
                                            input={<OutlinedInput label="serviços" sx={textFieldStyle} />}
                                            renderValue={(selected) => selected.map((role) => role.name).join(", ")}
                                            MenuProps={{ sx: selectMenuStyle }}
                                        >
                                            {services.map((service) => (
                                                <MenuItem key={service.id} value={service.id}>
                                                    <Checkbox checked={selectedServices.includes(service)} />
                                                    <ListItemText primary={service.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                    <Box sx={{ gap: "1vw", justifyContent: "flex-end" }}>
                                        <Button variant="outlined" onClick={() => navigate("/admin/customers")}>
                                            cancelar
                                        </Button>
                                        <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                            {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "enviar"}
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
