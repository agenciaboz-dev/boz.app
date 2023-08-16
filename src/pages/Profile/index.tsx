import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper, Skeleton, SxProps, alpha, lighten } from "@mui/material"
import { backgroundStyle } from "../../style/background"
import { Header } from "../../components/Header"
import { Card } from "./Card"
import { useDepartments } from "../../hooks/useDepartments"
import { useColors } from "../../hooks/useColors"
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
import { Tag } from "../../components/Tag"
import { useUser } from "../../hooks/useUser"
import { NewButton } from "../../components/NewButton"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { Form, Formik } from "formik"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Container, Data } from "./UserComponents"
import { UserForm } from "./UserForm"
import { useDate } from "../../hooks/useDate"
import { patternFormatter } from "react-number-format"
import masks from "../../style/masks"

interface ProfileProps {
    user: User
    admin?: boolean
    createOnly?: boolean
}

export const Profile: React.FC<ProfileProps> = ({ user, admin, createOnly }) => {
    const io = useIo()
    const colors = useColors()
    const api = useApi()
    const username = useParams().username
    const navigate = useNavigate()

    const { departments } = useDepartments()
    const { list, addUser } = useUser()
    const { snackbar } = useSnackbar()
    const { getDateString } = useDate()

    const [profile, setProfile] = useState(createOnly ? undefined : username ? list.find((item) => item.username == username) : user)
    const [isEditing, setIsEditing] = useState(createOnly)
    const [image, setImage] = useState<File>()
    const [selectedRoles, setSelectedRoles] = useState<Role[]>(profile?.roles || [])
    const [loading, setLoading] = useState(false)

    const [initialValues, setInitialValues] = useState<UserForm>({
        ...(profile || {
            name: "",
            cpf: "",
            email: "",
            username: "",
            phone: "",
        }),
        birth: getDateString(profile?.birth, true) || "",
        departmentId: departments.find((item) => item.id == profile?.department?.id)?.id || 1,
    })

    const shouldEdit = !!(user.id == profile?.id) || admin

    const wrapperStyle: SxProps = { flexDirection: "column", gap: "3vw", padding: "3vw", flex: 1 }

    const handleSubmit = (values: UserForm) => {
        const data = {
            ...values,
            roles: selectedRoles,
            image,
            id: profile?.id,
        }

        setLoading(true)
        io.emit(createOnly ? "user:new" : "user:update", data)
    }

    useEffect(() => {
        const user = list.find((item) => item.id == profile?.id)
        if (user) {
            setProfile(user)
        }
    }, [list])

    useEffect(() => {
        if (username && !profile) {
            api.user.find.username({
                data: { username },
                callback: (response: { data: User }) => {
                    console.log({ profile: response.data })
                    setProfile(response.data)
                },
            })
        }

        if (!username && profile) {
        }
    }, [])

    useEffect(() => {
        io.on("user:new:success", (user) => {
            addUser(user)
            setLoading(false)
            setIsEditing(false)
            setInitialValues({
                ...user,
                birth: getDateString(user.birth, true),
                departmentId: departments.find((item) => item.id == user.department.id),
            })
            setProfile(user)
            snackbar({ severity: "success", text: "usuário criado" })
        })

        io.on("user:new:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "não criou" })
        })

        io.on("user:update:success", (user) => {
            addUser(user)
            setLoading(false)
            setIsEditing(false)
            setInitialValues({
                ...user,
                birth: getDateString(user.birth, true),
                departmentId: departments.find((item) => item.id == user.department.id),
            })
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
        <Box sx={backgroundStyle}>
            {!admin && <Header user={user} disabledSearch />}
            <Box sx={{ padding: "2vw", height: "82%" }}>
                <Paper
                    elevation={3}
                    sx={{ width: "100%", height: "100%", bgcolor: "background.default", borderRadius: "0 3vw 0", position: "relative" }}
                >
                    <IconButton sx={{ position: "absolute", top: "1vw", left: "1vw" }} color="secondary" onClick={() => navigate(-1)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    {isEditing ? (
                        <>
                            <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                                {({ values, handleChange }) => (
                                    <Form>
                                        <Card
                                            user={profile}
                                            name={values.name}
                                            username={values.username}
                                            roles={selectedRoles}
                                            image={image}
                                            setImage={setImage}
                                            editing
                                        />
                                        <Box sx={{ ...wrapperStyle, gap: "2vw" }}>
                                            <UserForm
                                                values={values}
                                                handleChange={handleChange}
                                                selectedRoles={selectedRoles}
                                                setSelectedRoles={setSelectedRoles}
                                                createOnly={createOnly}
                                            />
                                            <Box sx={{ alignSelf: "end", gap: "1vw" }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => (createOnly ? navigate("/admin/users") : setIsEditing(false))}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    ) : (
                        <>
                            {shouldEdit && (
                                <NewButton
                                    onClick={() => setIsEditing(true)}
                                    bottom={"1vw"}
                                    right={"1vw"}
                                    icon={<ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />}
                                />
                            )}
                            <Card name={profile?.name} username={profile?.username} roles={profile?.roles} user={profile} />
                            <Box sx={wrapperStyle}>
                                <Container name="Informações Pessoais">
                                    <Data icon={<TextFieldsOutlinedIcon color="primary" />} title="Nome" value={profile?.name} />
                                    <Data
                                        icon={<PhoneIcon color="primary" />}
                                        title="Telefone"
                                        value={patternFormatter(profile?.phone || "", { format: masks.phone, patternChar: "0" })}
                                    />
                                    <Data
                                        icon={<FolderOpenIcon color="primary" />}
                                        title="CPF"
                                        value={patternFormatter(profile?.cpf || "", { format: masks.cpf, patternChar: "0" })}
                                    />
                                    <Data icon={<MailOutlineIcon color="primary" />} title="E-mail" value={profile?.email} />
                                    <Data
                                        icon={<DateRangeIcon color="primary" />}
                                        title="Data de nascimento"
                                        value={getDateString(profile?.birth, true)}
                                    />
                                    <Data icon={<PermIdentityIcon color="primary" />} title="Nome de usuário" value={profile?.username} />
                                </Container>

                                <Container name="Setor">
                                    <Data icon={<WorkOutlineOutlinedIcon color="primary" />} title="Departamento" value={profile?.department?.name} />
                                    <Data
                                        icon={<PermIdentityIcon color="primary" />}
                                        title="Funções"
                                        value={
                                            <>
                                                {profile?.roles?.map((role) => (
                                                    <Tag key={role.id} name={role.tag} sx={{ fontSize: "0.7vw" }} />
                                                ))}
                                            </>
                                        }
                                    />
                                </Container>
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    )
}
