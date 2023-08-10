import React from "react"
import { Avatar, Box, Drawer, MenuItem, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { backdropStyle } from "../style/backdrop"
import { ModeToggler } from "./ModeToggler"

interface UserDrawerProps {}

export const UserDrawer: React.FC<UserDrawerProps> = ({}) => {
    const { user, drawer } = useUser()

    const handleClose = () => {
        drawer.close()
    }

    return (
        <Drawer
            anchor={"right"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "22vw", backgroundColor: "background.paper" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
        >
            <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }} color={"text.secondary"}>
                <Avatar
                    src={`https://app.agenciaboz.com.br:4105/${user?.id}`}
                    sx={{ width: "10vw", height: "10vw", color: "primary.main", backgroundColor: "background.default" }}
                />
                <p style={{ fontWeight: "bold" }}>{user?.name}</p>
            </Box>
            <Box sx={{ flexDirection: "column" }}></Box>

            <ModeToggler />
        </Drawer>
    )
}
