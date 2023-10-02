import React, { useEffect, useState } from "react"
import { Box, CircularProgress, IconButton, TextField, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import { textFieldStyle } from "../../../style/textfield"
import CheckIcon from "@mui/icons-material/Check"
import { useIo } from "../../../hooks/useIo"
import { DeleteForever } from "@mui/icons-material"
import { useConfirmDialog } from "burgos-confirm"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../../../hooks/useUser"

interface DepartmentFormProps {
    department: Department
    finish: () => void
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, finish }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const io = useIo()

    const { confirm } = useConfirmDialog()
    const { snackbar } = useSnackbar()
    const { list } = useUser()
    const users = list.filter((user) => user.department.id == department.id)

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleSubmit = (values: { name: string }) => {
        if (loading) return

        const newDepartment = { ...department, name: values.name }
        setLoading(true)
        io.emit("department:update", newDepartment)
    }

    const handleDelete = () => {
        if (deleting) return
        if (!department) return
        if (users.length > 0) {
            snackbar({ severity: "error", text: "mova os usuários para outro departamento antes de deletar" })
            return
        }

        confirm({
            title: "atenção",
            content: `tem certeza que deseja deletar ${department.name}? essa ação é irreversível`,
            onConfirm: () => {
                setDeleting(true)
                io.emit("department:delete", department)
            },
        })
    }

    useEffect(() => {
        io.on("department:update:success", () => {
            snackbar({ severity: "success", text: "departamento atualizado" })
            setLoading(false)
            finish()
        })

        io.on("department:delete:success", () => {
            snackbar({ severity: "warning", text: "departamento deletado" })
            setLoading(false)
            finish()
        })

        return () => {
            io.off("department:update:success")
            io.off("department:delete:success")
        }
    }, [department])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                finish()
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <Formik initialValues={{ name: department.name }} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <TextField
                        label="atualizar departamento"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        sx={{ ...textFieldStyle, width: isMobile? "100%" : "21.5vw" }}
                        required
                        InputProps={{
                            endAdornment: (
                                <>
                                    <IconButton color={"error"} onClick={handleDelete}>
                                        {loading ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForever />}
                                    </IconButton>
                                    <IconButton color={"primary"} type="submit">
                                        {loading ? <CircularProgress size="1.5rem" color="primary" /> : <CheckIcon />}
                                    </IconButton>
                                </>
                            ),
                        }}
                    />
                </Form>
            )}
        </Formik>
    )
}
