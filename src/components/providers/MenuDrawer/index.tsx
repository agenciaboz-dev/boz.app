import React from "react"
import { Avatar, Box, Drawer, MenuItem, SxProps } from "@mui/material"
import { useMenu } from "../../../hooks/useMenu"
import { backdropStyle } from "../../../style/backdrop"
import logo from "../../../assets/logo.png"
import { useUser } from "../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { MenuButton } from "./MenuButton"

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({}) => {
    const navigate = useNavigate()

    const { drawer } = useMenu()
    const { user } = useUser()

    return (
        <Drawer
            anchor={"left"}
            open={drawer.open}
            onClose={drawer.close}
            PaperProps={{ sx: { width: "22vw", backgroundColor: "background.paper" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
        >
            <Box sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }} color={"text.secondary"}>
                <img src={logo} style={{ width: "10vw" }} />
            </Box>
            <Box sx={{ flexDirection: "column" }}>
                {drawer.menus.map((menu) => (
                    <MenuButton menu={menu} />
                ))}
            </Box>
        </Drawer>
    )
}
