import React, { useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogTitle, TextField, useMediaQuery } from "@mui/material"
import { useCustomers } from "../hooks/useCustomers"
import { backdropStyle } from "../style/backdrop"
import { Form, Formik } from "formik"
import { useApi } from "../hooks/useApi"
import { useSnackbar } from "burgos-snackbar"
import { useDepartments } from "../hooks/useDepartments"
import { DeleteForever } from "@mui/icons-material"

interface RoleModalProps {
    current_role?: Role
}

export const RoleModal: React.FC<RoleModalProps> = ({ current_role }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()

    const { roles, roleModal } = useDepartments()
    const { isOpen, close } = roleModal
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues: RoleForm = current_role || {
        name: "",
        tag: "",
        project_roles: "",
    }

    const handleSubmit = (values: RoleForm) => {
        if (loading) return
        if (roles.filter((item) => item.id != current_role?.id).find((role) => role.tag == values.tag)) {
            snackbar({ severity: "error", text: "função já cadastrada" })
            return
        }

        setLoading(true)

        current_role
            ? api.department.role.update({
                  data: { ...values, id: current_role.id },
                  callback: () => {
                      snackbar({ severity: "success", text: "função atualizada" })
                      handleClose()
                  },
                  finallyCallback: () => setLoading(false),
              })
            : api.department.role.new({
                  data: values,
                  callback: () => {
                      snackbar({ severity: "success", text: "função adicionada" })
                      handleClose()
                  },
                  finallyCallback: () => setLoading(false),
              })
    }

    const deleteRole = () => {
        api.department.role.delete({
            data: { id: current_role?.id },
            callback: () => {
                snackbar({ severity: "info", text: "função removida" })
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
            <DialogTitle style={{ textAlign: isMobile ? "center" : "start" }}>Nova função</DialogTitle>
            <Box sx={{ flexDirection: "column", padding: isMobile ? "5vw" : "2vw", width: isMobile ? "90vw" : "30vw", paddingTop: 0 }}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField label="Nome" name="name" value={values.name} onChange={handleChange} variant="standard" sx={{}} required />
                            <TextField label="Tag" name="tag" value={values.tag} onChange={handleChange} variant="standard" sx={{}} required />
                            <TextField
                                label="Funções nos projetos"
                                name="project_roles"
                                value={values.project_roles || ""}
                                onChange={handleChange}
                                variant="standard"
                                sx={{}}
                            />

                            <Box sx={{ alignSelf: "flex-end", marginTop: isMobile ? "5vw" : "2vw", gap: isMobile ? "3vw" : "1vw" }}>
                                {current_role && (
                                    <Button variant="outlined" color="error" onClick={deleteRole}>
                                        <DeleteForever />
                                    </Button>
                                )}
                                <Button onClick={handleClose}>cancelar</Button>
                                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    )
}
