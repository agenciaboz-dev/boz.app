import React, { useState, useEffect } from "react"
import { Box, Dialog, DialogTitle } from "@mui/material"
import { useCoffee } from "../../hooks/useCoffee"
import { backdropStyle } from "../../style/backdrop"
import { useUser } from "../../hooks/useUser"
import { useMuiTheme } from "../../hooks/useMuiTheme"
import { useIo } from "../../hooks/useIo"

interface CoffeeModalProps {}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({}) => {
    const io = useIo()
    const coffee = useCoffee()
    const { connectedList, list, user } = useUser()
    const modal = coffee.modal
    const colors = useMuiTheme().palette

    const [text, setText] = useState("Iniciando sorteio")
    const [coffeeMaker, setCoffeeMaker] = useState<User>()

    useEffect(() => {
        io.on("coffee:text", (data) => {
            setText(data.text)

            if (data.user) {
                setCoffeeMaker(data.user)
            }
        })

        return () => {
            io.off("coffee:text")
        }
    }, [])

    return (
        <Dialog
            open={modal.open}
            onClose={() => modal.setOpen(false)}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
        >
            <DialogTitle>Roleta do café</DialogTitle>
            <Box sx={{ flexDirection: "column", padding: "2vw", paddingTop: 0, alignItems: "center", width: "30vw", gap: "1vw" }}>
                {text}
                {coffeeMaker && (
                    <Box>
                        <p>{coffeeMaker.id == user?.id ? "Se lascou" : "Deu sorte"}</p>
                    </Box>
                )}
            </Box>
        </Dialog>
    )
}
