import React, { useState } from "react"
import { Box, CircularProgress, IconButton, Paper, TextField, darken, lighten, useMediaQuery } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { Roles } from "./Roles"
import { useDepartments } from "../../../hooks/useDepartments"
import { Form, Formik, FormikHelpers } from "formik"
import { textFieldStyle } from "../../../style/textfield"
import AddIcon from "@mui/icons-material/Add"
import { useApi } from "../../../hooks/useApi"
import { useSnackbar } from "burgos-snackbar"
import { DepartmentContainer } from "./DepartmentContainer"

interface DeparmentsProps {
    user: User
}

interface FormValues {
    name: string
}

export const Deparments: React.FC<DeparmentsProps> = ({ user }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const api = useApi()

    const { departments } = useDepartments()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const handleNewDepartment = (values: FormValues, bag: FormikHelpers<FormValues>) => {
        if (loading) return

        setLoading(true)
        api.department.new({
            data: values,
            callback: (response: { data: Department }) => {
                const department = response.data
                if (department) {
                    bag.resetForm()
                    snackbar({ severity: "success", text: "departamento criado" })
                } else {
                    snackbar({ severity: "error", text: "não rolou" })
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <Box sx={{ ...backgroundStyle, padding: isMobile? "5vw" : "2vw", gap: isMobile? "10vw" : "2vw", height: isMobile? "auto" : "100vh" }}>
            <Roles />

            <Paper sx={{ gap: isMobile? "5vw" : "1vw", bgcolor: "background.default", padding: isMobile? "5vw" : "1vw", flexDirection: "column" }}>
                <p style={{ fontWeight: "bold", fontSize: isMobile ? "6vw" : "1vw", textAlign: isMobile? "center" : "start" }}>Departamentos</p>

                <Box sx={{ gap: isMobile? "10vw" : "2vw", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {departments
                        .sort((a, b) => a.id - b.id)
                        .map((department) => (
                            <DepartmentContainer key={department.id} department={department} />
                        ))}
                    <Formik initialValues={{ name: "" }} onSubmit={handleNewDepartment}>
                        {({ values, handleChange }) => (
                            <Form>
                                <TextField
                                    label="Novo departamento"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    sx={{ ...textFieldStyle, width: isMobile? "80vw" : "21.5vw" }}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton color={"primary"} type="submit">
                                                {loading ? <CircularProgress size="1.5rem" color="primary" /> : <AddIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Box>
    )
}
