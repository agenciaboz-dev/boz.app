import React, { useState } from "react"
import { Box, Button, Checkbox, CircularProgress, ListItemText, MenuItem, OutlinedInput, Paper, Select, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
import { textFieldStyle } from "../../../style/textfield"
import { useCustomers } from "../../../hooks/useCustomers"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"

interface NewCustomerProps {}

export const NewCustomer: React.FC<NewCustomerProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()

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
        <Paper sx={{ bgcolor: "background.default", flexDirection: "column", gap: "1vw", padding: "1vw" }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField label="nome" name="name" value={values.name} onChange={handleChange} />
                        <TextField label="recomendações" name="recomendations" value={values.recomendations} onChange={handleChange} />
                        <Select
                            label="serviços"
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
        </Paper>
    )
}
