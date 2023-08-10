import React from "react"
import { MenuItem, SxProps } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"
import { useLocation } from "react-router-dom"

interface MenuButtonProps {
    menu: Menu
    sx?: SxProps
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, sx }) => {
    const Icon = () => menu.icon
    const location = useLocation()
    const active = location.pathname.split("/")[1] == menu.path.split("/")[1]

    const { drawer } = useMenu()

    const menuItemStyle: SxProps = {
        backgroundColor: active ? "secondary.main" : "",
        color: active ? "primary.main" : "secondary.main",
        pointerEvents: active ? "none" : "auto",
        fontWeight: "bold",
        gap: "1vw",
        ...sx,
    }

    const handleMenuClick = () => {
        drawer.close()
        menu.onClick()
    }

    return (
        <MenuItem key={menu.id} sx={menuItemStyle} onClick={() => handleMenuClick()}>
            <Icon />
            {menu.name}
        </MenuItem>
    )
}
