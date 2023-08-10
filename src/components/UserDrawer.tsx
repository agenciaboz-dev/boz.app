import React from "react"
import { Avatar, Box, Drawer, MenuItem, Switch, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { backdropStyle } from "../style/backdrop"
import { useDarkMode } from "../hooks/useDarkMode"

interface UserDrawerProps {}

export const UserDrawer: React.FC<UserDrawerProps> = ({}) => {
    const { user, drawer, logout } = useUser()
    const { darkMode, toogleDarkMode } = useDarkMode()

    const menuItemStyle: SxProps = { justifyContent: "center" }

    const handleClose = () => {
        drawer.close()
    }

    return (
        <Drawer
            anchor={"right"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "22vw" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
        >
            <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }}>
                <Avatar src={`https://app.agenciaboz.com.br:4105/${user?.id}`} sx={{ width: "10vw", height: "10vw" }} />
                <p style={{ fontWeight: "bold" }}>{user?.name}</p>
            </Box>

            <Box sx={{ flexDirection: "column" }}>
                <MenuItem sx={menuItemStyle}>perfil</MenuItem>
                <MenuItem sx={menuItemStyle} onClick={() => logout()}>
                    sair
                </MenuItem>
            </Box>

            <Box sx={{ marginTop: "auto" }}>
                <Switch checked={darkMode} onChange={() => toogleDarkMode()} />
            </Box>
        </Drawer>
    )
}
