import React, { useState } from "react"
import { Box, CircularProgress, IconButton, Paper, TextField, darken, lighten } from "@mui/material"
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
        <Box sx={{ ...backgroundStyle, padding: "2vw", gap: "2vw" }}>
            <Roles />

            <Paper sx={{ gap: "1vw", bgcolor: "background.default", padding: "1vw", flexDirection: "column" }}>
                <p style={{ fontWeight: "bold" }}>Departamentos</p>

                <Box sx={{ gap: "2vw", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {departments
                        .sort((a, b) => a.id - b.id)
                        .map((department) => (
                            <DepartmentContainer key={department.id} department={department} />
                        ))}
                    <Formik initialValues={{ name: "" }} onSubmit={handleNewDepartment}>
                        {({ values, handleChange }) => (
                            <Form>
                                <TextField
                                    label="novo departamento"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    sx={{ ...textFieldStyle, width: "21.5vw" }}
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
