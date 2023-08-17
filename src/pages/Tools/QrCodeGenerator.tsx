import React, { useRef, useState } from "react"
import { Box, Button, MenuItem, Paper, TextField } from "@mui/material"
import { QrCodeModal } from "../../components/QrcodeModal"
import { Form, Formik } from "formik"
import { saveAs } from "file-saver"
import SaveIcon from "@mui/icons-material/Save"
import { FileDownload } from "@mui/icons-material"
import { useSnackbar } from "burgos-snackbar"
import { useCustomers } from "../../hooks/useCustomers"
import { textFieldStyle } from "../../style/textfield"
import { selectMenuStyle } from "../../style/selectMenuStyle"

interface QrCodeGeneratorProps {
    user: User
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ user }) => {
    const ref = useRef<HTMLCanvasElement>(null)

    const { customers } = useCustomers()
    const { snackbar } = useSnackbar()

    const downloadImage = (values: QrCodeForm) => {
        if (!values.name) {
            snackbar({ severity: "error", text: "quer baixar sem nome?" })
            return
        }

        if (!values.content) {
            snackbar({ severity: "error", text: "cadê o código? quer baixar nada?" })
            return
        }

        const filename = `${values.name}${values.customerId ? ` - ${customers.find((item) => item.id == values.customerId)?.name.trim()}` : ""}`

        const canvas = ref.current?.querySelector("canvas")
        canvas?.toBlob((blob: Blob | null) => {
            if (blob) saveAs(blob, `${filename}.png`)
        })
    }
    const handleSubmit = (values: QrCodeForm) => {
        snackbar({ severity: "info", text: "não existe ainda" })
    }

    return (
        <Paper
            sx={{
                bgcolor: "background.default",
                flexDirection: "column",
                gap: "1vw",
                padding: "1vw",
                borderBottom: "2px solid",
                borderRadius: "0.5vw",
                fontWeight: "bold",
            }}
        >
            qr code
            <Formik initialValues={{ name: "", content: "", customerId: 0 }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <Box sx={{ gap: "1vw" }}>
                            <Box sx={{ flexDirection: "column", gap: "1vw", width: "20vw" }}>
                                <TextField label="nome" name="name" value={values.name} onChange={handleChange} sx={textFieldStyle} required />
                                <TextField
                                    label="código"
                                    name="content"
                                    value={values.content}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    required
                                />
                                <TextField
                                    label="cliente"
                                    name="customerId"
                                    value={values.customerId}
                                    onChange={handleChange}
                                    select
                                    sx={textFieldStyle}
                                    SelectProps={{
                                        MenuProps: {
                                            sx: selectMenuStyle,
                                        },
                                    }}
                                    required
                                >
                                    <MenuItem value={0} sx={{ display: "none" }}></MenuItem>
                                    {customers.map((customer) => (
                                        <MenuItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Box sx={{ gap: "1vw" }}>
                                    <Button variant="outlined" fullWidth type="submit">
                                        <SaveIcon color="primary" />
                                    </Button>
                                    <Button variant="outlined" fullWidth onClick={() => downloadImage(values)}>
                                        <FileDownload color="primary" />
                                    </Button>
                                </Box>
                            </Box>
                            <QrCodeModal value={values.content} ref={ref} />
                        </Box>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}
