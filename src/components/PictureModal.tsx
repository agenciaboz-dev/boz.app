import React from "react"
import { Box, Dialog, Slide, Avatar } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { usePictureModal } from "../hooks/usePictureModal"
import { backdropStyle } from "../style/backdrop"

interface PictureModalProps {}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const PictureModal: React.FC<PictureModalProps> = ({}) => {
    const { isOpen: open, close, url } = usePictureModal()

    const handleClose = () => {
        close()
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{ sx: { overflow: "hidden" } }}
        >
            <Avatar
                imgProps={{ sx: { objectFit: "contain" } }}
                src={url}
                variant="rounded"
                sx={{ width: "40vw", height: "40vw", objectFit: "contain", color: "primary.main", backgroundColor: "background.default" }}
            />
        </Dialog>
    )
}
