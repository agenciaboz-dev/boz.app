import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper, Skeleton, SxProps, alpha, lighten, useMediaQuery } from "@mui/material"
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
import InstagramIcon from "@mui/icons-material/Instagram"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
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
import { scrollbar } from "../../style/scrollbar"
import { useConfirmDialog } from "burgos-confirm"

interface ProfileProps {
    user: User
    admin?: boolean
    createOnly?: boolean
}

export const Profile: React.FC<ProfileProps> = ({ user, admin, createOnly }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const colors = useColors()
    const api = useApi()
    const username = useParams().username
    const navigate = useNavigate()

    const { departments } = useDepartments()
    const { list, addUser, isAdmin } = useUser()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { getDateString } = useDate()

    const [profile, setProfile] = useState(createOnly ? undefined : username ? list.find((item) => item.username == username) : user)
    const [isEditing, setIsEditing] = useState(createOnly)
    const [image, setImage] = useState<File>()
    const [selectedRoles, setSelectedRoles] = useState<Role[]>(profile?.roles || [])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const [initialValues, setInitialValues] = useState<UserForm>({
        ...(profile || {
            name: "",
            cpf: "",
            email: "",
            username: "",
            phone: "",
        }),
        instagram: "",
        github: "",
        birth: getDateString(profile?.birth, true) || "",
        departmentId: departments.find((item) => item.id == profile?.department?.id)?.id || 1,
    })

    const shouldEdit = !!(user.id == profile?.id) || isAdmin()

    const wrapperStyle: SxProps = { flexDirection: "column", gap: "1vw", padding: "3vw 1vw", flex: 1 }

    const handleSubmit = (values: UserForm) => {
        const data = {
            ...values,
            roles: selectedRoles,
            image,
            filename: image?.name,
            id: profile?.id,
        }

        setLoading(true)
        io.emit(createOnly ? "user:new" : "user:update", data)
    }

    const containsElement = (department: number | undefined, search: number) => {
        return department === search
    }
    const filterDevTag = containsElement(profile?.department.id, 1)
    //console.log(profile?.department.id)

    const scrollBar: SxProps = {
        overflowY: "auto",

        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888" /* Cor do rastreador */,
            borderRadius: "10px" /* Borda arredondada do rastreador */,
        },

        /* Estilizando o rastreador quando estiver passando o mouse */
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555" /* Cor do rastreador ao passar o mouse */,
        },

        /* Estilizando o rastreador quando estiver ativo (arrastando) */
        "&::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#333" /* Cor do rastreador quando arrastado */,
        },
    }
    const handleDelete = () => {
        if (deleting) return
        if (!profile) return

        confirm({
            title: "atenção",
            content: `tem certeza que deseja deletar ${profile.name}? essa ação é irreversível`,
            onConfirm: () => {
                setDeleting(true)
                api.user.delete({
                    data: profile,
                    callback: () => {
                        navigate(-1)
                    },
                })
            },
        })
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (isEditing && profile) {
                    setIsEditing(false)
                } else {
                    navigate(-1)
                }
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isEditing])

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
        <Box sx={{...backgroundStyle, height: isMobile? "auto" : "100vh"}}>
            {!admin && <Header user={user} disabledSearch />}
            <Box sx={{ padding: isMobile? "5vw" : "2vw", height: isMobile? "auto" : "90%" }}>
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "background.default",
                        borderRadius: "0 3vw 0",
                        position: "relative",
                        flexDirection: isMobile? "column" : "row",
                    }}
                >
                    <IconButton
                        sx={{ position: "absolute", top: "1vw", left: "1vw" }}
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
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
                                        <Box sx={{ ...wrapperStyle, gap: isMobile? "3vw" : "2vw", padding: isMobile? "5vw 0" : "3vw 1vw" }}>
                                            <Box
                                                sx={{
                                                    ...scrollBar,
                                                    padding: isMobile? "0 3vw" : "0 3.5vw",
                                                    height: "90%",
                                                    flexDirection: "column",
                                                    overflowX: "hidden",
                                                    gap: isMobile? "5vw" : "1vw",
                                                    paddingBottom: "2vw",
                                                }}
                                            >
                                                <UserForm
                                                    values={values}
                                                    handleChange={handleChange}
                                                    selectedRoles={selectedRoles}
                                                    setSelectedRoles={setSelectedRoles}
                                                    createOnly={createOnly}
                                                />
                                            </Box>
                                            <Box sx={{ alignSelf: "end", gap: isMobile? "3vw" : "1vw", paddingRight: isMobile? "3vw" : "4vw" }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        createOnly ? navigate("/admin/users") : setIsEditing(false)
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                                    {loading ? (
                                                        <CircularProgress size="1.5rem" color="secondary" />
                                                    ) : (
                                                        "salvar"
                                                    )}
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
                                <>
                                    <NewButton
                                        onClick={handleDelete}
                                        bottom={isMobile? "2vw" : "1vw"}
                                        right={isMobile? "21vw" : "6vw"}
                                        color="error"
                                        loading={deleting}
                                        icon={
                                            <DeleteForeverIcon
                                                sx={{ width: "100%", height: "100%", color: colors.secondary }}
                                            />
                                        }
                                    />
                                    <NewButton
                                        onClick={() => setIsEditing(true)}
                                        bottom={isMobile? "2vw" : "1vw"}
                                        right={isMobile? "2vw" : "1vw"}
                                        icon={
                                            <ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />
                                        }
                                    />
                                </>
                            )}
                            <Card
                                name={profile?.name}
                                username={profile?.username}
                                roles={profile?.roles}
                                user={profile}
                                dev={filterDevTag}
                            />
                            <Box sx={{ ...wrapperStyle, padding: isMobile? "3vw 3vw 20vw" : "3vw", gap: "3vw" }}>
                                <Container name="Informações Pessoais">
                                    <Data
                                        icon={<TextFieldsOutlinedIcon color="primary" />}
                                        title="Nome"
                                        value={profile?.name}
                                    />
                                    <Data
                                        icon={<WhatsAppIcon color="primary" />}
                                        title="Telefone"
                                        value={patternFormatter(profile?.phone || "", {
                                            format: masks.phone,
                                            patternChar: "0",
                                        })}
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
                                    <Data
                                        icon={<PermIdentityIcon color="primary" />}
                                        title="Nome de usuário"
                                        value={profile?.username}
                                    />
                                </Container>
                                <Container name="Redes Sociais">
                                    <Data
                                        icon={<InstagramIcon color="primary" />}
                                        title="Instagram"
                                        value={`@${profile?.username}`}
                                    />
                                </Container>
                                <Container name="Setor">
                                    <Data
                                        icon={<WorkOutlineOutlinedIcon color="primary" />}
                                        title="Departamento"
                                        value={profile?.department?.name}
                                    />
                                    <Data
                                        icon={<PermIdentityIcon color="primary" />}
                                        title="Funções"
                                        value={
                                            <Box
                                                sx={{
                                                    gap: isMobile? "1vw" : "0.25vw",
                                                    flexWrap: "wrap",
                                                    width: isMobile? "50vw" : "20vw"
                                                }}
                                            >
                                                {profile?.roles?.map((role) => (
                                                    <Tag
                                                        key={role.id}
                                                        name={role.tag}
                                                        tooltip={role.name}
                                                        sx={{
                                                            fontSize: isMobile? "4vw" : "0.7vw",
                                                            padding: isMobile? "0.5vw 2vw" : "0.25vw"
                                                        }}
                                                    />
                                                ))}
                                            </Box>
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
