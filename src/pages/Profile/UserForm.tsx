import React from "react"
import { Box, Checkbox, ListItemText, MenuItem, SxProps, TextField } from "@mui/material"
import { Container } from "./UserComponents"
import { textFieldStyle } from "../../style/textfield"
import { selectMenuStyle } from "../../style/selectMenuStyle"
import { useDepartments } from "../../hooks/useDepartments"

interface UserFormProps {
    values: UserForm
    handleChange: {
        (e: React.ChangeEvent<any>): void
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void
    }
    selectedRoles: Role[]
    setSelectedRoles: (roles: Role[]) => void
    createOnly?: boolean
}

export const UserForm: React.FC<UserFormProps> = ({ values, handleChange, selectedRoles, setSelectedRoles, createOnly }) => {
    const { departments, roles } = useDepartments()

    const style: SxProps = { ...textFieldStyle, width: "49%" }

    const handleRoleSelect = (child: any) => {
        const id = child.props.value as Number
        const role = roles.find((item) => item.id == id) as Role

        if (selectedRoles.map((item) => item.id).includes(role.id)) {
            setSelectedRoles(selectedRoles.filter((item) => item.id != role.id))
        } else {
            setSelectedRoles([...selectedRoles, role])
        }
    }

    return (
        <>
            <Container name="Informações Pessoais">
                <TextField label="Nome" name="name" value={values.name} onChange={handleChange} sx={style} required />
                <TextField label="Telefone" name="phone" value={values.phone} onChange={handleChange} sx={style} required />
                <TextField label="CPF" name="cpf" value={values.cpf} onChange={handleChange} sx={style} required />
                <TextField
                    label="Nome de usuário"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    sx={style}
                    required
                    disabled={!createOnly}
                />
                <TextField label="E-mail" name="email" value={values.email} onChange={handleChange} sx={style} required />
                <TextField label="Data de nascimento" name="birth" value={values.birth} onChange={handleChange} sx={style} required />
            </Container>

            <Container name="Setor">
                <TextField
                    label="Departamento"
                    name="department"
                    value={values.departmentId}
                    onChange={handleChange}
                    select
                    sx={textFieldStyle}
                    SelectProps={{
                        MenuProps: {
                            sx: selectMenuStyle,
                        },
                    }}
                    required
                >
                    <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                    {departments.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
                            {department.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Funções"
                    name="roles"
                    select
                    sx={textFieldStyle}
                    SelectProps={{
                        MenuProps: {
                            sx: selectMenuStyle,
                        },
                        value: selectedRoles,
                        onChange: (_, child) => handleRoleSelect(child),
                        multiple: true,
                        // @ts-ignore
                        renderValue: (selected: Role[]) => selected.map((role) => role.name).join(", "),
                    }}
                    required
                >
                    <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                    {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            <Checkbox checked={selectedRoles.map((item) => item.id).includes(role.id)} />
                            <ListItemText primary={role.name} />
                        </MenuItem>
                    ))}
                </TextField>
            </Container>
        </>
    )
}
