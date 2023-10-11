import React, { useEffect, useState } from "react"
import { Box, CircularProgress, IconButton, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface NewWarningProps {
    user: User
}

export const NewWarning: React.FC<NewWarningProps> = ({ user }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const initialValues: NewWarning = { title: "", text: "" }

    const handleSubmit = (values: NewWarning) => {
        if (loading) false
        console.log(values)
        setLoading(true)
        io.emit("warning:new", { ...values, creatorId: user.id })
    }

    useEffect(() => {
        io.on("warning:new:success", () => {
            setLoading(false)
            snackbar({ severity: "success", text: "Novo aviso criado com sucesso" })
        })

        io.on("warning:new:error", (error) => {
            console.log(error)
            setLoading(false)
            snackbar({ severity: "error", text: "Erro ao criar novo aviso" })
        })

        return () => {
            io.off("warning:new:success")
            io.off("warning:new:error")
        }
    }, [])

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <TextField
                            label="Título"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            required
                            InputProps={{
                                endAdornment: (
                                    <IconButton color="primary" type="submit">
                                        {loading ? <CircularProgress size="1.5rem" color="primary" /> : <AddCircleIcon />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField label="Texto" name="text" value={values.text} onChange={handleChange} multiline minRows={3} required />
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
