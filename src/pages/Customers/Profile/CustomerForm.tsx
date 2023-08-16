import React from "react"
import { Box, TextField, Select, OutlinedInput, MenuItem, ListItemText, Checkbox } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { textFieldStyle } from "../../../style/textfield"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
interface CustomerFormProps {
    values: CustomerForm
    handleChange: {
        (e: React.ChangeEvent<any>): void
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void
    }
    selectedServices: Service[]
    setSelectedServices: (services: Service[]) => void
    createOnly?: boolean
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
    values,
    handleChange,
    selectedServices,
    setSelectedServices,
    createOnly,
}) => {
    const { services } = useCustomers()

    const handleServiceSelect = (child: any) => {
        const id = child.props.value as Number
        const service = services.find((item) => item.id == id) as Service

        if (selectedServices.map((item) => item.id).includes(service.id)) {
            setSelectedServices(selectedServices.filter((item) => item.id != service.id))
        } else {
            setSelectedServices([...selectedServices, service])
        }
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
                gap: "2vw",
                height: "100%",
            }}
        >
            <TextField label="Nome" name="name" value={values.name} onChange={handleChange} sx={textFieldStyle} />
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
    )
}
