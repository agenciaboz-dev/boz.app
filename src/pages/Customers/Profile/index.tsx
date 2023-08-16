import React, { useState, useEffect } from "react"
import { Box, Paper, alpha, SxProps, Button, CircularProgress } from "@mui/material"
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

interface ProfileProps {
    //customer: Customer
    admin?: boolean
    createOnly?: boolean
}

export const Profile: React.FC<ProfileProps> = ({ admin, createOnly }) => {
    const api = useApi()
    const colors = useColors()
    const navigate = useNavigate()
    const id = useParams().id

    const { customers: list, services } = useCustomers()

    const [customer, setCustomer] = useState(
        createOnly ? undefined : id ? list.find((item) => item.id == Number(id)) : undefined
    )
    const [isEditing, setIsEditing] = useState(createOnly)
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File>()

    const [initialValues, setInitialValues] = useState<CustomerForm>({
        ...(customer || {
            name: "",
            recomendations: "",
        }),
    })

    const shouldEdit = admin

    const wrapperStyle: SxProps = {
        flexDirection: "row",
        gap: "5vw",
        padding: "3vw",
        backgroundColor: "background.default",
        boxShadow: `0px 2px 35px ${alpha(colors.text.secondary, 0.3)}`,
        borderRadius: "0.5vw",
        alignSelf: "center",
        alignItems: "center",
        width: "80%",
        height: "max-content",
    }

    const handleSubmit = (values: CustomerForm) => {
        if (loading) return

        setLoading(true)

        const data = {
            ...values,
            services: selectedServices,
        }

        api.customer.new({
            data,
            callback: (response: { data: Customer }) => {
                const customer = response.data
                if (customer) navigate("/admin/customers")
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const handleServiceSelect = (child: any) => {
        const id = child.props.value as Number
        const service = services.find((item) => item.id == id) as Service

        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((item) => item.id != service.id))
        } else {
            setSelectedServices([...selectedServices, service])
        }
    }

    return (
        <Box
            sx={{
                padding: "0vw 0vw",
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
                    height: "28vw",
                    maxHeight: "50vw",
                    gap: "1vw",
                    paddingTop: "10vw",
                }}
            >
                <Box sx={wrapperStyle}>
                    {isEditing ? (
                        <>
                            <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                                {({ values, handleChange }) => (
                                    <Form>
                                        <Card image={image} setImage={setImage} editing />
                                        <Box sx={{ flexDirection: "column", width: "62%", gap: "4.9vw" }}>
                                            <CustomerForm
                                                values={values}
                                                handleChange={handleChange}
                                                selectedServices={selectedServices}
                                                setSelectedServices={setSelectedServices}
                                                createOnly={createOnly}
                                            />
                                            <Box sx={{ gap: "1vw", justifyContent: "flex-end" }}>
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
                            {!shouldEdit && (
                                <NewButton
                                    onClick={() => setIsEditing(true)}
                                    bottom={"6.8vw"}
                                    right={"12.5vw"}
                                    icon={<ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />}
                                />
                            )}
                            <Card image={image} setImage={setImage} />
                            <Box sx={{ flexDirection: "column", width: "62%", gap: "2vw", alignSelf: "start" }}>
                                <h1>{customer?.name}</h1>
                                <Box sx={{ flexDirection: "column", width: "62%", gap: "0.4vw" }}>
                                    <Container name="Informações da Empresa" children />
                                    <Data title="Nome Fantasia" value={customer?.name} icon={<BusinessIcon />} />
                                    <Data title="Recomendações" value={customer?.recomendations} icon={<NotesIcon />} />
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}
