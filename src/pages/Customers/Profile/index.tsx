import React, { useState, useEffect } from "react"
import { Box, Paper, alpha, SxProps, Button, CircularProgress, IconButton, lighten, useMediaQuery } from "@mui/material"
import { useColors } from "../../../hooks/useColors"
import { Form, Formik } from "formik"
import { CustomerForm } from "./CustomerForm"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "./Card"
import { NewButton } from "../../../components/NewButton"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { Container, Data } from "../../Profile/UserComponents"
import BusinessIcon from "@mui/icons-material/Business"
import NotesIcon from "@mui/icons-material/Notes"
import { useCustomers } from "../../../hooks/useCustomers"
import { useApi } from "../../../hooks/useApi"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Tag } from "../../../components/Tag"
import { useMuiTheme } from "../../../hooks/useMuiTheme"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useConfirmDialog } from "burgos-confirm"
import { useSnackbar } from "burgos-snackbar"
import InstagramIcon from "@mui/icons-material/Instagram"
import LanguageIcon from "@mui/icons-material/Language"
import { scrollbar } from "../../../style/scrollbar"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"

interface ProfileProps {
    admin?: boolean
    createOnly?: boolean
}

export const Profile: React.FC<ProfileProps> = ({ admin, createOnly }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const colors = useColors()
    const navigate = useNavigate()
    const id = useParams().id
    const theme = useMuiTheme()
    const io = useIo()

    const color = lighten(colors.text.secondary, 0.35)

    const { customers: list } = useCustomers()
    const { isAdmin } = useUser()
    const { confirm } = useConfirmDialog()
    const { snackbar } = useSnackbar()

    const [customer, setCustomer] = useState(
        createOnly ? undefined : id ? list.find((item) => item.id == Number(id)) : undefined
    )
    const [isEditing, setIsEditing] = useState(createOnly)
    const [selectedServices, setSelectedServices] = useState<Service[]>(customer?.services || [])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const [image, setImage] = useState<File>()

    const [initialValues, setInitialValues] = useState<CustomerForm>({
        ...(customer || {
            name: "",
            recomendations: "",
        }),
        instagram: "",
        website: "",
    })

    const shouldEdit = isAdmin() || admin

    const wrapperStyle: SxProps = {
        flexDirection: "row",
        gap: "5vw",
        padding: "3vw",
        backgroundColor: "background.default",
        boxShadow: `0px 2px 35px ${alpha(colors.text.secondary, 0.2)}`,
        borderRadius: "0.5vw",
        alignSelf: "center",
        alignItems: "center",
        width: "80%",
        height: "36.5vw",
        position: "relative",
    }

    const handleDelete = () => {
        if (deleting) return
        if (!customer) return

        confirm({
            title: "atenção",
            content: `tem certeza que deseja deletar ${customer.name}? essa ação é irreversível`,
            onConfirm: () => {
                setDeleting(true)
                io.emit("customer:delete", customer)
            },
        })
    }

    const handleSubmit = (values: CustomerForm) => {
        if (loading) return

        setLoading(true)

        const data = {
            ...values,
            image,
            filename: image?.name,
            services: selectedServices,
        }

        io.emit(createOnly ? "customer:new" : "customer:update", data)
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (isEditing && customer) {
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
        io.on("customer:delete:success", () => {
            navigate(-1)
        })

        io.on("customer:new:success", (data: Customer) => {
            setLoading(false)
            setIsEditing(false)
            setCustomer(data)
            setInitialValues(data)
        })

        io.on("customer:update:success", (data: Customer) => {
            setLoading(false)
            setIsEditing(false)
            setCustomer(data)
            setInitialValues(data)
        })

        return () => {
            io.off("customer:new:success")
            io.off("customer:update:success")
            io.off("customer:delete:success")
        }
    }, [customer])

    return (
        <Box
            sx={{
                padding: 0,
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    borderRadius: "0.3vw 3vw 0",
                    backgroundColor: "background.paper",
                    width: "100%",
                    flexDirection: "column",
                    height: isMobile ? "100%" : "70%",
                    maxHeight: isMobile ? "100%" : "50vw",
                    position: "relative",
                    padding: isMobile ? "5vw" : "1vw",
                }}
            >
                <IconButton sx={{ alignSelf: "flex-start" }} color="secondary" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Box
                    sx={{
                        ...wrapperStyle,
                        flexDirection: isMobile ? "column" : "row",
                        height: "auto",
                        width: "100%",
                        padding: isMobile ? "5vw 5vw 20vw" : "3vw",
                    }}
                >
                    {isEditing ? (
                        <>
                            <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                                {({ values, handleChange }) => (
                                    <Form>
                                        <Card image={image} setImage={setImage} customer={customer} editing />
                                        <Box
                                            sx={{
                                                flexDirection: "column",
                                                height: "auto",
                                                width: isMobile ? "100%" : "57%",
                                                gap: "5vw",
                                                flexShrink: "unset",
                                            }}
                                        >
                                            <CustomerForm
                                                values={values}
                                                handleChange={handleChange}
                                                selectedServices={selectedServices}
                                                setSelectedServices={setSelectedServices}
                                                createOnly={createOnly}
                                            />
                                            <Box sx={{ gap: isMobile ? "3vw" : "1vw", justifyContent: "flex-end" }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        createOnly ? navigate("/admin/customers") : setIsEditing(false)
                                                    }
                                                >
                                                    cancelar
                                                </Button>
                                                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                                    {loading ? (
                                                        <CircularProgress size="1.5rem" color="secondary" />
                                                    ) : (
                                                        "enviar"
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
                                        bottom={isMobile ? "3vw" : "1.5vw"}
                                        right={isMobile ? "24vw" : "6.2vw"}
                                        color="error"
                                        icon={
                                            <DeleteForeverIcon
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    color: colors.secondary,
                                                }}
                                            />
                                        }
                                    />
                                    <NewButton
                                        onClick={() => setIsEditing(true)}
                                        bottom={isMobile ? "3vw" : "1.5vw"}
                                        right={isMobile ? "3vw" : "1.5vw"}
                                        icon={
                                            <ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />
                                        }
                                    />
                                </>
                            )}
                            <Card image={image} setImage={setImage} customer={customer} />
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    width: isMobile ? "100%" : "55%",
                                    gap: isMobile ? "5vw" : "1vw",
                                    alignSelf: "start",
                                }}
                            >
                                <h1>{customer?.name}</h1>
                                <Box sx={{ flexDirection: "column", width: "100%" }}>
                                    <Container
                                        name="Informações da Empresa"
                                        children
                                        // titleChildren={
                                        //     <Button sx={{ width: 1 }}>
                                        //         <ReportGmailerrorredIcon />
                                        //         Recomendações{" "}
                                        //     </Button>
                                        // }
                                    />
                                    <Box sx={{ flexDirection: "column", gap: isMobile ? "3vw" : "0.5vw", width: "100%" }}>
                                        <Box
                                            sx={{
                                                flexDirection: "row",
                                                gap: isMobile ? "2vw" : "0.5vw",
                                                padding: "0 0 3vw",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {customer?.services.map((service) => (
                                                <Tag
                                                    key={service.id}
                                                    name={service.tag}
                                                    tooltip={service.name}
                                                    sx={{
                                                        fontSize: isMobile ? "4vw" : "0.7vw",
                                                        padding: isMobile ? "0.5vw 1.5vw" : "0.25vw 0.5vw",
                                                    }}
                                                    color={customer.active ? "" : theme.palette.error.main}
                                                />
                                            ))}
                                        </Box>

                                        <Data title="Instagram" value={`@username`} icon={<InstagramIcon />} />
                                        <Data title="Website" value={"https://site.com.br"} icon={<LanguageIcon />} />

                                        <Box
                                            sx={{ flexDirection: "column", gap: isMobile ? "3vw" : "0.5vw", width: "100%" }}
                                        >
                                            <Data title="Nome" value={customer?.name} icon={<BusinessIcon />} />
                                            <Data
                                                title="Recomendações"
                                                value={customer?.name}
                                                icon={<ReportGmailerrorredIcon />}
                                            />

                                            <Data title="Descrição" value={" "} icon={<NotesIcon />} />
                                            <Box
                                                sx={{
                                                    ...scrollbar,
                                                    width: "100%",
                                                    height: isMobile ? "auto" : "10vw",
                                                    paddingRight: "0.8vw",
                                                }}
                                            >
                                                <p style={{ color, width: "100%", textAlign: "justify" }}>
                                                    {customer?.recomendations}
                                                </p>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}
