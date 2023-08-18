import React, { useState } from "react"
import { Box, Collapse, MenuItem, SxProps, alpha, darken } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"
import { useLocation } from "react-router-dom"
import { useColors } from "../../hooks/useColors"
import { KeyboardArrowDown } from "@mui/icons-material"

interface MenuButtonProps {
    menu: Menu
    sx?: SxProps
}

export const MenuButton: React.FC<MenuButtonProps> = ({ menu, sx }) => {
    const Icon = () => menu.icon
    const location = useLocation()
    const active = location.pathname.split("/")[1] == menu.path.split("/")[1]
    const colors = useColors()

    const { drawer } = useMenu()

    const [collapse, setCollapse] = useState(active)

    const buildStyle = (active: boolean, menu: Menu) => {
        const menuItemStyle: SxProps = {
            backgroundColor: active ? (menu.submenus ? "" : "secondary.main") : "",
            color: active ? (menu.submenus ? "secondary.main" : "background.paper") : "secondary.main",
            pointerEvents: active ? (menu.submenus ? "auto" : "none") : "auto",
            fontWeight: "bold",
            gap: "1vw",
            ...sx,
        }

        return menuItemStyle
    }

    const handleMenuClick = (menu: Menu) => {
        if (!menu.submenus) {
            drawer.close()
            menu.onClick()
        } else {
            setCollapse((collapse) => !collapse)
        }
    }

    return (
        <>
            <MenuItem key={menu.id} sx={buildStyle(active, menu)} onClick={() => handleMenuClick(menu)}>
                <Icon />
                {menu.name}
                {menu.submenus && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />}
            </MenuItem>

            <Collapse in={collapse}>
                <Box sx={{ flexDirection: "column", width: "100%" }}>
                    {menu.submenus?.map((menu) => {
                        const active = location.pathname.split("/")[2] == menu.path.split("/")[1]
                        const Icon = () => menu.icon

                        return (
                            <MenuItem key={menu.id} sx={{ ...buildStyle(active, menu), paddingLeft: "3vw" }} onClick={() => handleMenuClick(menu)}>
                                <Icon />
                                {menu.name}
                            </MenuItem>
                        )
                    })}
                </Box>
            </Collapse>
        </>
    )
}
