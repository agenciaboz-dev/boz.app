import React, { useEffect, useState } from "react"
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
import { Form, Formik } from "formik"
import CheckIcon from "@mui/icons-material/Check"
import { Avatar } from "@files-ui/react"
import { useDepartments } from "../../../hooks/useDepartments"
import { selectMenuStyle } from "../../../style/selectMenuStyle"
import { useIo } from "../../../hooks/useIo"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"
import ClearIcon from "@mui/icons-material/Clear"
import { Tag } from "../../../components/Tag"
import colors from "../../../style/colors"
import { textFieldStyle } from "../../../style/textfield"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
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
        <Box sx={{ width: "100%", height: "80.2%", padding: "2vw " }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <Paper
                            elevation={3}
                            sx={{ borderRadius: "0.3vw 3vw 0", backgroundColor: colors.background, width: "100%" }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    // backgroundColor: colors.secondary,
                                    width: "25%",
                                    padding: "8vw 3vw",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "1.5vw",
                                    //borderRadius: "0.2vw 0 0 0.2vw ",
                                    borderRadius: "0.2vw 0 0 2vw ",
                                }}
                            >
                                <Avatar
                                    src={image}
                                    onChange={(file) => setImage(file)}
                                    smartImgFit={"orientation"}
                                    changeLabel="trocar a imagem"
                                    emptyLabel="enviar imagem"
                                    // style={{ width: "100%", height: "30vw" }}
                                    style={{
                                        width: "12vw",
                                        height: "12vw",
                                        borderRadius: "20vw",
                                        fontSize: "1.0vw",
                                    }}
                                />

                                <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                                    <p style={{ fontWeight: "600", fontSize: "1.3vw", color: colors.secondary }}>
                                        {user.name}
                                    </p>
                                    <p style={{ fontSize: "1.0vw", color: colors.secondary }}>@{user.username}</p>
                                </Box>

                                <Box
                                    sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}
                                >
                                    <Tag variant="" style="0.7vw" name="Admin"></Tag>
                                    <Tag variant="" style="0.7vw" name="Planejamento"></Tag>
                                    <Tag variant="" style="0.7vw" name="Dev"></Tag>
                                </Box>
                            </Paper>
                            <Box sx={{ width: "75%", height: "100%", padding: "2vw", gap: "2vw" }}>
                                <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                    <TextField
                                        label="nome"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                    <TextField
                                        label="e-mail"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                    <TextField
                                        label="nome de usuário"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                    <TextField
                                        label="cpf"
                                        name="cpf"
                                        value={values.cpf}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                    <TextField
                                        label="data de nascimento"
                                        name="birth"
                                        value={values.birth}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                </Box>
                                <Box sx={{ flexDirection: "column", gap: "1vw", flex: 1 }}>
                                    <TextField
                                        label="departamento"
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
                        </Paper>
                        <IconButton
                            sx={{
                                fontWeight: "bold",
                                position: "fixed",
                                bottom: "34vw",
                                left: "3vw",

                                alignSelf: "flex-start",
                            }}
                            onClick={() => navigate("/admin/users")}
                        >
                            <ArrowBackIosIcon color="secondary"></ArrowBackIosIcon>
                        </IconButton>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                color: "secondary.main",
                                fontWeight: "bold",
                                position: "fixed",
                                bottom: "3vw",
                                right: "3vw",
                                padding: "0.6vw 2.3vw",
                            }}
                        >
                            {loading ? (
                                <CircularProgress sx={{ color: "secondary.main", width: "100%", height: "100%" }} />
                            ) : (
                                <p>Salvar</p>
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
