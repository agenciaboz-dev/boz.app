import React from "react"
import { Avatar, Box, Drawer, MenuItem, SxProps } from "@mui/material"
import { useMenu } from "../hooks/useMenu"
import { backdropStyle } from "../style/backdrop"
import logo from "../assets/logo.png"
import { useUser } from "../hooks/useUser"

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({}) => {
    const { drawer } = useMenu()
    const { user } = useUser()

    const menuItemStyle: SxProps = {
        // justifyContent: "center",
        color: "secondary.main",
        fontWeight: "bold",
        gap: "1vw",
        // position: "relative",
    }
    const iconStyle: SxProps = {
        // position: "absolute",
        // left: "3vw",
    }

    const handleClose = () => {
        drawer.close()
    }

    return (
        <Drawer
            anchor={"left"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "22vw", backgroundColor: "background.paper" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
        >
            <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }} color={"text.secondary"}>
                <img src={logo} style={{ width: "10vw" }} />
            </Box>
            <Box sx={{ flexDirection: "column" }}>
                {drawer.menus.map((menu) => {
                    const Icon = () => menu.icon
                    return (
                        <MenuItem key={menu.id} sx={menuItemStyle}>
                            <Icon />
                            {menu.name}
                        </MenuItem>
                    )
                })}
            </Box>
        </Drawer>
    )
}
