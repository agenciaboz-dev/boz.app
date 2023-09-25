import React from "react"
import { Box, Dialog, DialogTitle } from "@mui/material"
import { useCoffee } from "../../hooks/useCoffee"
import { backdropStyle } from "../../style/backdrop"

interface CoffeeModalProps {}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({}) => {
    const coffee = useCoffee()
    const modal = coffee.modal

    return (
        <Dialog
            open={modal.open}
            onClose={() => modal.setOpen(false)}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
        >
            <DialogTitle>Hora do café</DialogTitle>
            <Box sx={{ flexDirection: "column", padding: "2vw", width: "30vw", paddingTop: 0 }}></Box>
        </Dialog>
    )
}
