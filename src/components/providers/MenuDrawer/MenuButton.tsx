import React from "react"
import { MenuItem, SxProps } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useMenu } from "../../../hooks/useMenu"

interface MenuButtonProps {
    menu: Menu
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu }) => {
    const Icon = () => menu.icon
    const navigate = useNavigate()
    const { drawer } = useMenu()

    const menuItemStyle: SxProps = {
        color: "secondary.main",
        fontWeight: "bold",
        gap: "1vw",
    }

    const handleMenuClick = () => {
        drawer.close()
        navigate(menu.path)
    }

    return (
        <MenuItem key={menu.id} sx={menuItemStyle} onClick={() => handleMenuClick()}>
            <Icon />
            {menu.name}
        </MenuItem>
    )
}
