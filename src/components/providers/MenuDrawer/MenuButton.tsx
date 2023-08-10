import React from "react"
import { MenuItem, SxProps } from "@mui/material"
import { useMenu } from "../../../hooks/useMenu"

interface MenuButtonProps {
    menu: Menu
    sx?: SxProps
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, sx }) => {
    const Icon = () => menu.icon
    const { drawer } = useMenu()

    const menuItemStyle: SxProps = {
        color: "secondary.main",
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
