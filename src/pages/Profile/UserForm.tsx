import React, { useEffect } from "react"
import { Box, Checkbox, ListItemText, MenuItem, SxProps, TextField, useMediaQuery } from "@mui/material"
import { Container } from "./UserComponents"
import { textFieldStyle } from "../../style/textfield"
import { selectMenuStyle } from "../../style/selectMenuStyle"
import { useDepartments } from "../../hooks/useDepartments"
import MaskedInput from "../../components/MaskedInput"
import masks from "../../style/masks"
import { TaiTextField } from "../../components/TaiTextField"
import { useUser } from "../../hooks/useUser"
import { useIo } from "../../hooks/useIo"

interface UserFormProps {
    values: UserForm
    handleChange: {
        (e: React.ChangeEvent<any>): void
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void
    }
    selectedRoles: Role[]
    setSelectedRoles: (roles: Role[]) => void
    createOnly?: boolean
}

export const UserForm: React.FC<UserFormProps> = ({ values, handleChange, selectedRoles, setSelectedRoles, createOnly }) => {
    const io = useIo()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { departments, roles } = useDepartments()
    const { isAdmin } = useUser()

    const style: SxProps = { width: isMobile ? "100%" : "49%" }

    const handleRoleSelect = (child: any) => {
        const id = child.props.value as Number
        const role = roles.find((item) => item.id == id) as Role

        if (selectedRoles.map((item) => item.id).includes(role.id)) {
            setSelectedRoles(selectedRoles.filter((item) => item.id != role.id))
        } else {
            setSelectedRoles([...selectedRoles, role])
        }
    }

    useEffect(() => {
        if (departments.length == 0) io.emit("department:sync")
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                paddingTop: isMobile ? "9vw" : "0",
                gap: isMobile ? "9vw" : "2vw",
            }}
        >
            <Container name="Informações Pessoais">
                <TaiTextField label="Nome" name="name" value={values.name} onChange={handleChange} sx={style} required />
                <TaiTextField
                    label="Telefone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    sx={style}
                    required
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: masks.phone },
                    }}
                />
                <TaiTextField
                    label="CPF"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    sx={style}
                    required
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: masks.cpf },
                    }}
                />
                <TaiTextField label="E-mail" name="email" value={values.email} onChange={handleChange} sx={style} required />

                <TaiTextField
                    label="Data de nascimento"
                    name="birth"
                    value={values.birth}
                    onChange={handleChange}
                    sx={style}
                    required
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: masks.date },
                    }}
                />
                <TaiTextField
                    label="Nome de usuário"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    sx={style}
                    required
                    disabled={!createOnly}
                />
                <TaiTextField
                    label="Instagram"
                    name="instagram"
                    value={values.instagram}
                    onChange={handleChange}
                    sx={style}
                    required={false}
                />
                <TaiTextField
                    label="Github"
                    name="Github"
                    value={values.github}
                    onChange={handleChange}
                    sx={style}
                    required={false}
                />
            </Container>

            <Container name="Setor">
                <TextField
                    label="Departamento"
                    name="departmentId"
                    value={values.departmentId}
                    onChange={handleChange}
                    select
                    sx={textFieldStyle}
                    SelectProps={{
                        MenuProps: {
                            sx: selectMenuStyle,
                        },
                        sx: { overflow: "hidden", paddingRight: "12vw" },
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
                            // sx: selectMenuStyle,
                            MenuListProps: { sx: { bgcolor: "background.default", height: "max-content" } },
                        },
                        sx: { overflow: "hidden", paddingRight: "12vw" },
                        value: selectedRoles,
                        onChange: (_, child) => handleRoleSelect(child),
                        multiple: true,
                        // @ts-ignore
                        renderValue: (selected: Role[]) => selected.map((role) => role.name).join(", "),
                    }}
                    required
                >
                    <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                    {roles.map((role) => {
                        if (role.tag == "admin") {
                            return isAdmin() ? (
                                <MenuItem key={role.id} value={role.id}>
                                    <Checkbox checked={selectedRoles.map((item) => item.id).includes(role.id)} />
                                    <ListItemText primary={role.name} />
                                </MenuItem>
                            ) : (
                                <></>
                            )
                        } else
                            return (
                                <MenuItem key={role.id} value={role.id}>
                                    <Checkbox checked={selectedRoles.map((item) => item.id).includes(role.id)} />
                                    <ListItemText primary={role.name} />
                                </MenuItem>
                            )
                    })}
                </TextField>
            </Container>
        </Box>
    )
}
