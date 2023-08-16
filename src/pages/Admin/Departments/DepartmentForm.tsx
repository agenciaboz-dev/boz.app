import React, { useEffect, useState } from "react"
import { Box, CircularProgress, IconButton, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { textFieldStyle } from "../../../style/textfield"
import CheckIcon from "@mui/icons-material/Check"
import { useIo } from "../../../hooks/useIo"

interface DepartmentFormProps {
    department: Department
    finish: () => void
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, finish }) => {
    const io = useIo()

    const [loading, setLoading] = useState(false)

    const handleSubmit = (values: { name: string }) => {
        if (loading) return

        const newDepartment = { ...department, name: values.name }
        setLoading(true)
        io.emit("department:update", newDepartment)
    }

    useEffect(() => {
        io.on("department:update:success", () => {
            setLoading(false)
            finish()
        })

        return () => {
            io.off("department:update:success")
        }
    }, [department])

    return (
        <Formik initialValues={{ name: department.name }} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <TextField
                        label="atualizar departamento"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        sx={{ ...textFieldStyle, width: "21.5vw" }}
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton color={"primary"} type="submit">
                                    {loading ? <CircularProgress size="1.5rem" color="primary" /> : <CheckIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                </Form>
            )}
        </Formik>
    )
}
