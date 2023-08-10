import React from "react"
import { Avatar, Box, Drawer, MenuItem, Switch, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { backdropStyle } from "../style/backdrop"
import { useDarkMode } from "../hooks/useDarkMode"
import { useColors } from "../hooks/useColors"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

interface UserDrawerProps {}

export const UserDrawer: React.FC<UserDrawerProps> = ({}) => {
    const { user, drawer, logout } = useUser()
    const { darkMode, toogleDarkMode } = useDarkMode()
    const colors = useColors()

    const menuItemStyle: SxProps = { justifyContent: "center" }

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
            <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }}>
                <Avatar
                    src={`https://app.agenciaboz.com.br:4105/${user?.id}`}
                    sx={{ width: "10vw", height: "10vw", color: "secondary.main", backgroundColor: "primary.main" }}
                />
                <p style={{ fontWeight: "bold" }}>{user?.name}</p>
            </Box>
            <Box sx={{ flexDirection: "column" }}>
                <MenuItem color="primary" sx={menuItemStyle}>
                    perfil
                </MenuItem>
                <MenuItem color="primary" sx={menuItemStyle} onClick={() => logout()}>
                    sair
                </MenuItem>
            </Box>

            <Box sx={{ marginTop: "auto", position: "absolute", alignItems: "center", padding: "1vw", top: "0", right: "0" }}>
                <LightModeIcon color={darkMode ? "disabled" : "primary"} />
                <Switch checked={darkMode} onChange={() => toogleDarkMode()} />
                <DarkModeIcon color={darkMode ? "primary" : "disabled"} />
            </Box>
        </Drawer>
    )
}
