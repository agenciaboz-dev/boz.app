import React, { useEffect, useRef, useState } from "react"
import { Box, Button, CircularProgress, IconButton, MenuItem, Paper, TextField, Tooltip, useMediaQuery } from "@mui/material"
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import CloseIcon from "@mui/icons-material/Close"
interface QrCodeGeneratorProps {
    user: User
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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

        const filename = `${values.name}${
            values.customerId ? ` - ${customers.find((item) => item.id == values.customerId)?.name.trim()}` : ""
        }`

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

    const handleDelete = () => {
        console.log("deletou")
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
        <Box
            sx={{
                color: "primary.main",
                padding: isMobile ? "8vw 2vw 2vw 2vw" : "2vw",
                margin: isMobile ? "0 5vw 5vw" : "2vw 5vw",
                flexDirection: "column",
                gap: isMobile ? "4vw" : "2vw",
                overflowX: "hidden",
            }}
        >
            <h1 style={{ fontSize: isMobile ? "6vw" : "", textAlign: isMobile ? "center" : "left" }}>QR Code</h1>
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
                <Formik initialValues={initialQrCode} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, handleChange }) => (
                        <Form>
                            <Box
                                sx={{
                                    gap: isMobile ? "2vw" : "1vw",
                                    flexDirection: isMobile ? "column-reverse" : "",
                                    padding: isMobile ? "2vw" : "",
                                }}
                            >
                                <Box sx={{ flexDirection: "column", gap: isMobile ? "3vw" : "1vw", flex: "1" }}>
                                    <TextField
                                        label="Cliente"
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
                                    <TextField
                                        label="Nome do código"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                        required
                                    />
                                    <TextField
                                        label="Código"
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                        required
                                        autoComplete="off"
                                    />

                                    <Box sx={{ gap: "1vw", marginTop: "auto" }}>
                                        <Button
                                            sx={{ gap: "0.25vw" }}
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => downloadImage(values)}
                                        >
                                            <FileDownload color="primary" />
                                            Baixar
                                        </Button>
                                        <Button sx={{ gap: "0.4vw" }} variant="outlined" fullWidth type="submit">
                                            {loading ? (
                                                <CircularProgress size="1.5rem" color="primary" />
                                            ) : (
                                                <SaveIcon color="primary" />
                                            )}
                                            Salvar
                                        </Button>
                                    </Box>
                                </Box>
                                <QrCodeModal value={values.code} ref={ref} />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <h2 style={{ color: "#757575", fontSize: isMobile ? "5vw" : "2vw" }}>Carregar código salvo:</h2>
            <Paper
                sx={{
                    bgcolor: "background.default",
                    flexDirection: "column",
                    gap: "1vw",
                    padding: isMobile ? "3vw" : "1vw",
                    borderBottom: "2px solid",
                    borderRadius: "0.5vw",
                    fontWeight: "bold",
                }}
            >
                {" "}
                <TextField
                    label="Selecione"
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
                    {" "}
                    <MenuItem value={0} sx={{}}>
                        <IconButton></IconButton>
                    </MenuItem>
                    {savedCodes.map((qrcode) => (
                        <MenuItem key={qrcode.id} value={qrcode.id}>
                            <Box sx={{ alignItems: "center", gap: "1vw" }}>
                                <Tooltip
                                    title="Excluir QR Code"
                                    onClick={() => {
                                        handleDelete
                                    }}
                                >
                                    <CloseIcon key={qrcode.id} fontSize="small" />
                                </Tooltip>
                                {qrcode.name} - {qrcode.customer.name}
                            </Box>
                        </MenuItem>
                    ))}{" "}
                </TextField>
            </Paper>
        </Box>
    )
}
