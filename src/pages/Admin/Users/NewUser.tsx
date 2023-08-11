import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import CheckIcon from "@mui/icons-material/Check"
import { Avatar } from "@files-ui/react"
import { useDepartments } from "../../../hooks/useDepartments"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
import { useIo } from "../../../hooks/useIo"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"

interface NewUserProps {
    user: User
}

export const NewUser: React.FC<NewUserProps> = ({ user }) => {
    const io = useIo()
    const navigate = useNavigate()

    const { departments, roles } = useDepartments()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>()
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

    const initialValues: UserForm = {
        name: "",
        email: "",
        username: "",
        cpf: "",
        birth: "",
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

        setLoading(true)
        io.emit("user:new", data)
    }

    useEffect(() => {
        io.on("user:new:success", () => {
            setLoading(false)
            navigate("/admin/users")
            snackbar({ severity: "success", text: "usuário criado" })
        })

        io.on("user:new:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "não criou" })
        })

        return () => {
            io.off("user:new:success")
            io.off("user:new:failed")
        }
    }, [])

    return (
        <Box sx={{ padding: "2vw", justifyContent: "space-between", width: "100vw" }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <Avatar
                            src={image}
                            onChange={(file) => setImage(file)}
                            smartImgFit={"orientation"}
                            changeLabel="trocar a imagem"
                            emptyLabel="enviar imagem"
                            // style={{ width: "100%", height: "30vw" }}
                            style={{
                                width: "20vw",
                                height: "20vw",
                                borderRadius: "20vw",
                                fontSize: "2.5vw",
                            }}
                        />
                        <Box sx={{ gap: "1vw", width: "74vw" }}>
                            <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                <TextField label="nome" name="name" value={values.name} onChange={handleChange} />
                                <TextField label="e-mail" name="email" value={values.email} onChange={handleChange} />
                                <TextField label="nome de usuário" name="username" value={values.username} onChange={handleChange} />
                                <TextField label="cpf" name="cpf" value={values.cpf} onChange={handleChange} />
                                <TextField label="data de nascimento" name="birth" value={values.birth} onChange={handleChange} />
                            </Box>
                            <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                <TextField
                                    label="departamento"
                                    name="department"
                                    value={values.department}
                                    onChange={handleChange}
                                    select
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

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "secondary.main",
                                fontWeight: "bold",
                                position: "fixed",
                                bottom: "2vw",
                                right: "2vw",
                                borderRadius: "50%",
                                width: "5vw",
                                height: "5vw",
                            }}
                        >
                            {loading ? (
                                <CircularProgress sx={{ color: "secondary.main", width: "100%", height: "100%" }} />
                            ) : (
                                <CheckIcon sx={{ width: "100%", height: "100%" }} />
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
