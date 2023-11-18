import { Box, useMediaQuery } from "@mui/material"
import { forwardRef } from "react"
import { QRCode } from "react-qrcode-logo"

interface QrCodeModalProps {
    value: string
}

export const QrCodeModal = forwardRef<HTMLCanvasElement, QrCodeModalProps>((props, ref) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const vw = window.innerWidth / 100
    const qrCodeSize = isMobile ? 50 * vw : 30 * vw

    return (
        <Box ref={ref} sx={{ justifyContent: "center", }}>
            <QRCode value={props.value} size={qrCodeSize} />
        </Box>
    )
})
