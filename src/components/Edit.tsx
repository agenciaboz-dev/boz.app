import React, { useState } from "react"
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    IconButton,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
} from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import MaskedInput from "./MaskedInput"
import { useDepartments } from "../hooks/useDepartments"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"
import { Form, Formik } from "formik"
import { selectMenuStyle } from "../style/selectMenuStyle"

interface EditProps {
    user: User
    profile?: User | null
}

export const Edit: React.FC<EditProps> = ({ user, profile }) => {
    const { departments, roles } = useDepartments()
    const { snackbar } = useSnackbar()
    const { addUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>()
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

    const initialValues: UserForm = {
        name: profile?.name || "",
        email: profile?.email || "",
        username: profile?.username || "",
        cpf: profile?.cpf || "",
        phone: "",
        birth: new Date(profile?.birth || 0).toLocaleDateString("pt-br") || "",
        department: 0,
        role: 0,
    }

    const handleRoleSelect = (child: any) => {
        const id = child.props.value as Number
        const role = roles.find((item) => item.id == id) as Role

        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((item) => item.id != role.id))
        } else {
            setSelectedRoles([...selectedRoles, role])
        }
    }

    const handleSubmit = (values: UserForm) => {
        if (loading) return

        const data = {
            ...values,
            departmentId: values.department,
            roles: selectedRoles,
            image,
        }
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <Box sx={{ width: "75%", height: "100%", padding: "3vw", gap: "2vw", flexDirection: "column" }}>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <p style={{ fontWeight: "bolder" }}>Informações Pessoais</p>
                            <hr style={{}} />
                        </Box>

                        <Box sx={{ gap: "1vw" }}>
                            <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="CPF"
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: "000.000.000-00" },
                                    }}
                                />
                                <TextField
                                    label="Data de nascimento"
                                    name="birth"
                                    value={values.birth}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: "00/00/0000" },
                                    }}
                                />
                            </Box>
                            <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                <TextField
                                    label="Telefone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: "(00) 0 0000-0000" },
                                    }}
                                />
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Nome de usuário"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flexDirection: "column", gap: "0.2vw" }}>
                            <p style={{ fontWeight: "bolder" }}>Setor</p>
                            <hr style={{}} />
                        </Box>
                        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                            <TextField
                                label="Departamento"
                                name="department"
                                value={values.department}
                                onChange={handleChange}
                                select
                                sx={textFieldStyle}
                                SelectProps={{
                                    MenuProps: {
                                        sx: selectMenuStyle,
                                    },
                                }}
                            >
                                <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                                {departments.map((department) => (
                                    <MenuItem key={department.id} value={department.id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Select
                                name="roles"
                                multiple
                                value={selectedRoles}
                                onChange={(_, child) => handleRoleSelect(child)}
                                input={<OutlinedInput label="funções" />}
                                renderValue={(selected) => selected.map((role) => role.name).join(", ")}
                                MenuProps={{ sx: selectMenuStyle }}
                                sx={textFieldStyle}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        <Checkbox checked={selectedRoles.includes(role)} />
                                        <ListItemText primary={role.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
