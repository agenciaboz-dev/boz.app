import React, { useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogTitle, TextField } from "@mui/material"
import { useCustomers } from "../hooks/useCustomers"
import { backdropStyle } from "../style/backdrop"
import { Form, Formik } from "formik"
import { useApi } from "../hooks/useApi"
import { useSnackbar } from "burgos-snackbar"
import { useDepartments } from "../hooks/useDepartments"

interface RoleModalProps {}

export const RoleModal: React.FC<RoleModalProps> = ({}) => {
    const api = useApi()

    const { roles, roleModal } = useDepartments()
    const { isOpen, close } = roleModal
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues: ServiceForm = {
        name: "",
        tag: "",
    }

    const handleSubmit = (values: ServiceForm) => {
        if (loading) return
        if (roles.find((role) => role.tag == values.tag)) {
            snackbar({ severity: "error", text: "função já cadastrada" })
            return
        }

        setLoading(true)
        api.department.role.new({
            data: values,
            callback: () => {
                snackbar({ severity: "success", text: "função adicionada" })
                handleClose()
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const handleClose = () => {
        close()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
        >
            <DialogTitle>Nova função</DialogTitle>
            <Box sx={{ flexDirection: "column", padding: "2vw", width: "30vw", paddingTop: 0 }}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
