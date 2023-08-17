import { Box } from "@mui/material"
import { forwardRef } from "react"
import { QRCode } from "react-qrcode-logo"

interface QrCodeModalProps {
    value: string
}

export const QrCodeModal = forwardRef<HTMLCanvasElement, QrCodeModalProps>((props, ref) => {
    const vw = window.innerWidth / 100

    return (
        <Box ref={ref}>
            <QRCode value={props.value} size={20 * vw} />
        </Box>
    )
})
