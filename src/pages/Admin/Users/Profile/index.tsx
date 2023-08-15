import React, { useState, useEffect } from "react"
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    TextField,
    SxProps,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from "@mui/material"
import { Avatar } from "../../../../components/Avatar"
import { Tag } from "../../../../components/Tag"
import { useNavigate, useParams } from "react-router-dom"
import { WildCard } from "../../../WildCard"
import { useUser } from "../../../../hooks/useUser"
import { NewButton } from "../../../../components/NewButton"
import { useConfirmDialog } from "burgos-confirm"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import PhoneIcon from "@mui/icons-material/Phone"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import DateRangeIcon from "@mui/icons-material/DateRange"
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import { textFieldStyle } from "../../../../style/textfield"
import MaskedInput from "../../../../components/MaskedInput"
import { Form, Formik } from "formik"
import { useIo } from "../../../../hooks/useIo"
import { useDepartments } from "../../../../hooks/useDepartments"
import { useSnackbar } from "burgos-snackbar"
import { selectMenuStyle } from "../../../../style/selectMenuStyle"
import { useColors } from "../../../../hooks/useColors"
import { Avatar as AvatarUpload } from "@files-ui/react"

interface UpdateUsersProps {
    user: User
    variant?: "default" | "new"
}

export const Profile: React.FC<UpdateUsersProps> = ({ user, variant = "default" }) => {
    const { list, remove } = useUser()
    const { confirm } = useConfirmDialog()

    const username = useParams().username
    const profile = list.find((item) => item.username == username)
    const navigate = useNavigate()

    const [isEditing, setEditingMode] = useState(variant == "default" ? false : true)

    const style_icon: SxProps = {
        gap: "0.4vw",
        alignItems: "center",
    }
    const [deleting, setDeleting] = useState(false)

    const handleEditing = () => {
        if (isEditing) {
            setEditingMode(false)
        } else {
            setEditingMode(true)
        }
    }

    const handleDelete = () => {
        if (deleting) return
        if (!profile) return

        confirm({
            title: "atenção",
            content: `tem certeza que deseja deletar a conta de ${profile.name}? essa ação é irreversível`,
            onConfirm: () => remove(profile, setDeleting),
        })
    }

    const io = useIo()
    const colors = useColors()

    const { departments, roles } = useDepartments()
    const { snackbar } = useSnackbar()
    const { addUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>()
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

    const initialValues: UserForm = profile || {
        name: "",
        email: "",
        username: "",
        cpf: "",
        phone: "",
        birth: new Date(user?.birth || 0).toLocaleDateString("pt-br") || "",
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

    const handleNewUser = (values: UserForm) => {
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
    const handleUpdateUser = (values: UserForm) => {
        if (loading) return

        const data = {
            ...values,
            departmentId: values.department,
            roles: selectedRoles,
            image,
        }

        setLoading(true)
        io.emit("user:update", data)
    }

    useEffect(() => {
        io.on("user:new:success", (user) => {
            addUser(user)
            setLoading(false)
            navigate("/admin/users")
            snackbar({ severity: "success", text: "usuário criado" })
        })

        io.on("user:new:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "não criou" })
        })

        io.on("user:update:success", (user) => {
            addUser(user)
            setLoading(false)
            navigate("/admin/users")
            snackbar({ severity: "success", text: "usuário atualizado" })
        })

        io.on("user:update:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "não foi" })
        })

        return () => {
            io.off("user:new:success")
            io.off("user:new:failed")
            io.off("user:update:failed")
            io.off("user:update:success")
        }
    }, [])

    return (
        <Box sx={{ width: "100%", height: "80.2%", padding: "2vw 3vw" }}>
            <Formik initialValues={initialValues} onSubmit={variant == "default" ? handleUpdateUser : handleNewUser}>
                {({ values, handleChange }) => (
                    <Form>
                        <Paper
                            elevation={3}
                            sx={{ borderRadius: "0.3vw 3vw 0", backgroundColor: "background.default", width: "100%", position: "relative" }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    backgroundColor: "background.paper",
                                    width: "25%",
                                    padding: "8vw 3vw",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "2vw",
                                    borderRadius: "0.2vw 0 0 2vw ",
                                    position: "relative",
                                }}
                            >
                                <IconButton
                                    sx={{ position: "absolute", top: "1vw", left: "1vw" }}
                                    color="secondary"
                                    onClick={() => (!isEditing ? navigate("/admin/users") : setEditingMode(false))}
                                >
                                    <ArrowBackIosNewIcon />
                                </IconButton>

                                {isEditing ? (
                                    <AvatarUpload
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
                                ) : (
                                    <Avatar size={"12vw"} user={profile!} />
                                )}
                                <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                                    <p style={{ fontWeight: "600", fontSize: "1.3vw", color: colors.secondary }}>{values.name}</p>
                                    <p style={{ fontSize: "1.0vw", color: colors.secondary }}>@{values.username}</p>
                                </Box>
                                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}>
                                    <Tag variant="" fontSize="0.7vw" name="Admin"></Tag>
                                    <Tag variant="" fontSize="0.7vw" name="Planejamento"></Tag>
                                    <Tag variant="" fontSize="0.7vw" name="Dev"></Tag>
                                </Box>
                            </Paper>

                            {!isEditing && profile ? (
                                <Box sx={{ width: "75%", height: "100%", padding: "3vw", gap: "4vw", flexDirection: "column" }}>
                                    <Box sx={{ flexDirection: "column", gap: "2vw" }}>
                                        <Box sx={{ width: "100%", flexDirection: "column", gap: "0.5vw" }}>
                                            <p style={{ fontWeight: "bolder" }}>Informações Pessoais</p>
                                            <hr style={{}} />
                                        </Box>
                                        <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                            <Box sx={{ flexDirection: "column", gap: "1vw", width: "50%" }}>
                                                <Box sx={style_icon}>
                                                    <TextFieldsOutlinedIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        Nome Completo:<span style={{ fontWeight: "500" }}> {profile.name}</span>
                                                    </p>
                                                </Box>
                                                <Box sx={style_icon}>
                                                    <FolderOpenIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        CPF:<span style={{ fontWeight: "500" }}> {profile.cpf}</span>
                                                    </p>
                                                </Box>
                                                <Box sx={style_icon}>
                                                    <DateRangeIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        Data de Nascimento:<span style={{ fontWeight: "500" }}> {profile.birth}</span>
                                                    </p>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flexDirection: "column", gap: "1vw", width: "50%" }}>
                                                <Box sx={style_icon}>
                                                    <PhoneIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        Telefone:<span style={{ fontWeight: "500" }}> (41) 9 9275-2905</span>
                                                    </p>
                                                </Box>
                                                <Box sx={style_icon}>
                                                    <MailOutlineIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        E-mail:<span style={{ fontWeight: "500" }}> {profile.email}</span>
                                                    </p>
                                                </Box>
                                                <Box sx={style_icon}>
                                                    <PermIdentityIcon fontSize="small" />
                                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                        Username:<span style={{ fontWeight: "500" }}> @{profile.username}</span>
                                                    </p>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flexDirection: "column", gap: "2vw" }}>
                                        <Box sx={{ width: "100%", flexDirection: "column", gap: "0.5vw" }}>
                                            <p style={{ fontWeight: "bolder" }}>Setor</p>
                                            <hr />
                                        </Box>
                                        <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                            <Box sx={{ ...style_icon, width: "50%" }}>
                                                <WorkOutlineOutlinedIcon fontSize="small" />
                                                <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                    Departamento:<span style={{ fontWeight: "500" }}> {profile.department.name}</span>
                                                </p>
                                            </Box>
                                            <Box sx={{ ...style_icon, width: "50%" }}>
                                                <PermIdentityIcon fontSize="small" />
                                                <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                                    Funções:
                                                    <span style={{ fontWeight: "500" }}> </span>
                                                </p>
                                                {profile.roles.map((role) => (
                                                    <Tag key={role.id} name={role.tag} sx={{ fontSize: "0.7vw" }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <NewButton
                                        onClick={handleEditing}
                                        bottom={"1vw"}
                                        right={"1vw"}
                                        icon={<ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />}
                                    />
                                </Box>
                            ) : (
                                <>
                                    <Box
                                        sx={{
                                            width: "75%",
                                            height: "100%",
                                            padding: "3vw",
                                            gap: "2vw",
                                            flexDirection: "column",
                                        }}
                                    >
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
                                                    required
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
                                                    required
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
                                                    required
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
                                                    required
                                                />
                                                <TextField
                                                    label="E-mail"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    sx={textFieldStyle}
                                                    required
                                                />
                                                <TextField
                                                    label="Nome de usuário"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    sx={textFieldStyle}
                                                    required
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
                                                required
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
                                    <Box
                                        sx={{
                                            marginTop: "auto",
                                            alignSelf: "flex-end",
                                            gap: "1vw",
                                            flexDirection: "row",
                                            position: "fixed",
                                            bottom: "3.2vw",
                                            right: "6vw",
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{ color: "error.main", fontWeight: "bold", minWidth: 0, padding: "0 0.5vw" }}
                                            color="error"
                                            onClick={handleDelete}
                                        >
                                            {deleting ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForeverIcon />}
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                color: "secondary.main",
                                                fontWeight: "bold",
                                                // position: "fixed",
                                                // bottom: "3.2vw",
                                                // right: "6vw",
                                                padding: "0.6vw 2.3vw",
                                                width: "10vw",
                                            }}
                                        >
                                            {loading ? (
                                                <CircularProgress size="1.5rem" sx={{ color: "secondary.main" }} />
                                            ) : (
                                                <p>{variant == "default" ? "Salvar" : "Adicionar"}</p>
                                            )}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Paper>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
