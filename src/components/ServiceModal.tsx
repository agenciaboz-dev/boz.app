import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogTitle, TextField } from "@mui/material"
import { useCustomers } from "../hooks/useCustomers"
import { backdropStyle } from "../style/backdrop"
import { Form, Formik } from "formik"
import { useApi } from "../hooks/useApi"
import { useSnackbar } from "burgos-snackbar"
import { useIo } from "../hooks/useIo"

interface ServiceModalProps {}

export const ServiceModal: React.FC<ServiceModalProps> = ({}) => {
    const io = useIo()
    const api = useApi()

    const { serviceModal, services } = useCustomers()
    const { isOpen, close, current: service } = serviceModal
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues: ServiceForm = service || {
        name: "",
        tag: "",
    }

    const handleNewService = (values: ServiceForm) => {
        if (loading) return
        if (services.find((service) => service.tag == values.tag)) {
            snackbar({ severity: "error", text: "Serviço já cadastrado" })
            return
        }

        setLoading(true)
        api.service.new({
            data: values,
            callback: () => {
                snackbar({ severity: "success", text: "serviço adicionado" })
                handleClose()
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const updateService = (values: ServiceForm) => {
        if (loading) return
        if (!service) return
        if (services.find((service) => service.tag == values.tag) && values.tag != service.tag) {
            snackbar({ severity: "error", text: "Serviço já cadastrado" })
            return
        }

        setLoading(true)
        const updatedService: Service = { ...service, ...values }
        io.emit("service:update", updatedService)
    }

    const handleClose = () => {
        close()
    }

    useEffect(() => {
        io.on("service:update:success", () => {
            setLoading(false)
            handleClose()
        })

        return () => {
            io.off("service:update:success")
        }
    }, [])

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
        >
            <DialogTitle>{service ? "atualizar serviço" : "Novo serviço"}</DialogTitle>
            <Box sx={{ flexDirection: "column", padding: "2vw", width: "30vw", paddingTop: 0 }}>
                <Formik initialValues={initialValues} onSubmit={service ? updateService : handleNewService} enableReinitialize>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField label="nome" name="name" value={values.name} onChange={handleChange} variant="standard" sx={{}} required />
                            <TextField label="tag" name="tag" value={values.tag} onChange={handleChange} variant="standard" sx={{}} required />

                            <Box sx={{ alignSelf: "flex-end", marginTop: "2vw", gap: "1vw" }}>
                                <Button onClick={handleClose}>cancelar</Button>
                                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "enviar"}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    )
}
