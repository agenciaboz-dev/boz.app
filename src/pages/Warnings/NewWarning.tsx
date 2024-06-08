import React, { useEffect, useState } from "react"
import { Box, Chip, CircularProgress, IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { Form, Formik, FormikHelpers } from "formik"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { TaiTextField } from "../../components/TaiTextField"
import { useDepartments } from "../../hooks/useDepartments"
import { useCustomers } from "../../hooks/useCustomers"
import { selectMenuStyle } from "../../style/selectMenuStyle"

interface NewWarningProps {
    user: User
    customer?: boolean
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            bgColor: "black",
        },
    },
}
const getStyles = (name: string, selectedDepartments: readonly string[]) => {
    return {
        fontWeight: selectedDepartments.indexOf(name) === -1 ? "600" : "800",
    }
}
const getStylesCustomer = (name: string, selectedCustomer: string | undefined) => {
    return {
        fontWeight: selectedCustomer === name ? "800" : "600",
    }
}
export const NewWarning: React.FC<NewWarningProps> = ({ user, customer }) => {
    const io = useIo()

    const { departments } = useDepartments()
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])

    const { customers } = useCustomers()
    const [selectedCustomer, setSelectedCustomer] = useState<string>()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const handleChangeDepartments = (event: SelectChangeEvent<string[]>) => {
        setSelectedDepartments(event.target.value as string[])
    }
    const handleChangeCustomer = (event: SelectChangeEvent<string>) => {
        setSelectedCustomer(event.target.value as string)
    }
    const initialValues: NewWarning = { title: "", text: "", customerId: undefined, departments: [] }

    const handleSubmit = (values: NewWarning, bag: FormikHelpers<NewWarning>) => {
        if (loading) false

        const findDepartments = getDepartmentsByName(selectedDepartments, departments)
        const data = {
            ...values,
            departments: findDepartments,
        }
        console.log(data)
        setLoading(true)
        io.emit("warning:new", { ...data, creatorId: user.id })
        bag.resetForm()
    }

    useEffect(() => {
        io.on("warning:new:success", (warning: Warning) => {
            setLoading(false)
            snackbar({ severity: "success", text: "Novo aviso criado com sucesso" })
            console.log(warning)
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

    const getDepartmentsByName = (names: string[], allDepartments: { id: number; name: string }[]) => {
        return allDepartments.filter((department) => names.includes(department.name))
    }

    useEffect(() => {
        const findDepartments = getDepartmentsByName(selectedDepartments, departments)
        console.log(findDepartments)
    }, [selectedDepartments])

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {({ values, handleChange }) => (
                <Form>
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        {customer && (
                            <Box sx={{ gap: "1vw" }}>
                                <TaiTextField
                                    select
                                    label="Cliente"
                                    name="customerId"
                                    value={selectedCustomer || ""}
                                    onChange={(e) => {
                                        handleChange(e)
                                        handleChangeCustomer(e as SelectChangeEvent<string>)
                                    }}
                                    required
                                    SelectProps={{
                                        MenuProps: {
                                            sx: selectMenuStyle,
                                        },
                                    }}
                                >
                                    {customers.map((customer) => (
                                        <MenuItem
                                            key={customer.id}
                                            value={customer.id}
                                            style={getStylesCustomer(customer.name, selectedCustomer)}
                                        >
                                            {customer.name}
                                        </MenuItem>
                                    ))}
                                </TaiTextField>
                                {/* <TaiTextField
                                    select
                                    label="Departamentos"
                                    name="departments"
                                    value={values.departments}
                                    onChange={handleChange}
                                    required
                                    SelectProps={{
                                        multiple: true,
                                        value: selectedDepartments,
                                        onChange: handleChangeDepartments,
                                        MenuProps: {
                                            sx: selectMenuStyle,
                                        },
                                        // sx: { overflow: "hidden", paddingRight: "12vw" },
                                        input: <OutlinedInput id="select-multiple-chip" label="Chip" />,
                                        renderValue: (selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {(selected as string[]).map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={
                                                            departments.find((dept) => String(dept.id) === value)?.name ||
                                                            value
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        ),
                                        // MenuProps: MenuProps,
                                    }}
                                >
                                    {departments.map((department) => (
                                        <MenuItem
                                            key={department.id}
                                            value={department.name}
                                            style={getStyles(department.name, selectedDepartments)}
                                        >
                                            {department.name}
                                        </MenuItem>
                                    ))}
                                </TaiTextField> */}
                            </Box>
                        )}
                        <TaiTextField
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

                        <TaiTextField
                            label="Texto"
                            name="text"
                            value={values.text}
                            onChange={handleChange}
                            multiline
                            minRows={3}
                            required
                        />
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
