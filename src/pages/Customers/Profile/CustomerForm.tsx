import React from "react"
import { Box, TextField, Select, OutlinedInput, MenuItem, ListItemText, Checkbox, useMediaQuery } from "@mui/material"
import { useCustomers } from "../../../hooks/useCustomers"
import { textFieldStyle } from "../../../style/textfield"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
import { TaiTextField } from "../../../components/TaiTextField"
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
    const isMobile = useMediaQuery("(orientation:portrait)")
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
                height: "100%",
                width: "100%",
                gap: isMobile ? "3vw" : "0.7vw",
                flexShrink: "unset",
            }}
        >
            <TaiTextField label="Nome" name="name" value={values.name} onChange={handleChange} required={true} />
            <TaiTextField
                label="Descrição"
                name="recomendations"
                value={values.recomendations}
                onChange={handleChange}
                required={false}
            />
            <TextField
                label="Serviços"
                name="services"
                select
                sx={textFieldStyle}
                SelectProps={{
                    MenuProps: {
                        sx: selectMenuStyle,
                    },
                    value: selectedServices,
                    onChange: (_, child) => handleServiceSelect(child),
                    multiple: true,
                    // @ts-ignore
                    renderValue: (selected: Service[]) => selected.map((role) => role.name).join(", "),
                }}
                required
            >
                <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                        <Checkbox checked={selectedServices.map((item) => item.id).includes(service.id)} />
                        <ListItemText primary={service.name} />
                    </MenuItem>
                ))}
            </TextField>
            <TaiTextField
                label="Instagram"
                name="instagram"
                value={values.instagram}
                onChange={handleChange}
                required={false}
            />
            <TaiTextField label="Website" name="website" value={values.website} onChange={handleChange} required={false} />
        </Box>
    )
}
