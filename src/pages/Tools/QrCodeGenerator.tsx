import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, IconButton, MenuItem, Paper, TextField } from "@mui/material"
import { QrCodeModal } from "../../components/QrcodeModal"
import { Form, Formik } from "formik"
import { saveAs } from "file-saver"
import SaveIcon from "@mui/icons-material/Save"
import { FileDownload } from "@mui/icons-material"
import { useSnackbar } from "burgos-snackbar"
import { useCustomers } from "../../hooks/useCustomers"
import { textFieldStyle } from "../../style/textfield"
import { selectMenuStyle } from "../../style/selectMenuStyle"
import { useIo } from "../../hooks/useIo"
import ClearIcon from "@mui/icons-material/Clear"

interface QrCodeGeneratorProps {
    user: User
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ user }) => {
    const ref = useRef<HTMLCanvasElement>(null)
    const io = useIo()

    const { customers } = useCustomers()
    const { snackbar } = useSnackbar()
    const savedCodes = customers
        .map((customer) => customer.qrcodes)
        .flat()
        .sort((a, b) => a.id - b.id)

    const [loading, setLoading] = useState(false)
    const [initialQrCode, setInitialQrCode] = useState<QrCodeForm>({ name: "", code: "", customerId: 0 })
    const [loadedCode, setLoadedCode] = useState(0)

    const downloadImage = (values: QrCodeForm) => {
        if (!values.name) {
            snackbar({ severity: "error", text: "quer baixar sem nome?" })
            return
        }

        if (!values.code) {
            snackbar({ severity: "error", text: "cadê o código? quer baixar nada?" })
            return
        }

        const filename = `${values.name}${values.customerId ? ` - ${customers.find((item) => item.id == values.customerId)?.name.trim()}` : ""}`

        const canvas = ref.current?.querySelector("canvas")
        canvas?.toBlob((blob: Blob | null) => {
            if (blob) saveAs(blob, `${filename}.png`)
        })
    }

    const handleChangeInitialQrCode = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = Number(event.target.value)
        if (id) {
            const qrObject = savedCodes.find((item) => item.id == id) as QrCode
            setInitialQrCode({ ...qrObject, customerId: qrObject.customer.id })
            setLoadedCode(qrObject.id)
        } else {
            setInitialQrCode({ name: "", code: "", customerId: 0 })
            setLoadedCode(0)
        }
    }

    const handleSubmit = (values: QrCodeForm) => {
        if (loading) return
        if (!values.name) {
            snackbar({ severity: "error", text: "quer salvar sem nome?" })
            return
        }

        if (!values.code) {
            snackbar({ severity: "error", text: "cadê o código? quer salvar nada?" })
            return
        }

        if (!values.customerId) {
            snackbar({ severity: "error", text: "qual cliente?" })
            return
        }

        setLoading(true)
        const data = { ...values, customer: customers.find((item) => item.id == values.customerId), user }
        io.emit(loadedCode ? "qrcode:update" : "qrcode:new", data)
    }

    useEffect(() => {
        io.on("qrcode:new:success", (qrcode: QrCode) => {
            setLoading(false)
        })

        return () => {
            io.off("qrcode:new:success")
        }
    }, [])

    return (
        <Box sx={{ padding: "2vw" }}>
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
                <Formik initialValues={initialQrCode} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, handleChange }) => (
                        <Form>
                            <Box sx={{ gap: "1vw" }}>
                                <Box sx={{ flexDirection: "column", gap: "1vw", width: "30vw" }}>
                                    <TextField
                                        label="carregar código salvo"
                                        value={loadedCode}
                                        onChange={(event) => handleChangeInitialQrCode(event)}
                                        select
                                        sx={textFieldStyle}
                                        SelectProps={{
                                            MenuProps: {
                                                sx: selectMenuStyle,
                                            },
                                        }}
                                        required
                                    >
                                        <MenuItem value={0} sx={{}}>
                                            <IconButton></IconButton>
                                        </MenuItem>
                                        {savedCodes.map((qrcode) => (
                                            <MenuItem key={qrcode.id} value={qrcode.id}>
                                                {qrcode.name} - {qrcode.customer.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField label="nome" name="name" value={values.name} onChange={handleChange} sx={textFieldStyle} required />
                                    <TextField
                                        label="código"
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                        required
                                        autoComplete="off"
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

                                    <Box sx={{ gap: "1vw", marginTop: "auto" }}>
                                        <Button variant="outlined" fullWidth onClick={() => downloadImage(values)}>
                                            <FileDownload color="primary" />
                                        </Button>
                                        <Button variant="outlined" fullWidth type="submit">
                                            {loading ? <CircularProgress size="1.5rem" color="primary" /> : <SaveIcon color="primary" />}
                                        </Button>
                                    </Box>
                                </Box>
                                <QrCodeModal value={values.code} ref={ref} />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    )
}
