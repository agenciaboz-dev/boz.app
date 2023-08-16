import React, { useEffect, useState } from "react"
import { Box, IconButton, SxProps, TextField } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SearchIcon from "@mui/icons-material/Search"
import { useUser } from "../hooks/useUser"
import { useDarkMode } from "../hooks/useDarkMode"
import { useColors } from "../hooks/useColors"
import logo from "../assets/logo.png"
import { useMenu } from "../hooks/useMenu"
import { textFieldStyle } from "../style/textfield"
import { Avatar } from "./Avatar"
import { useSearch } from "../hooks/useSearch"
import ClearIcon from "@mui/icons-material/Clear"
import { useMediaQuery } from 'react-responsive'

interface HeaderProps {
    user: User
    disabledSearch?: boolean
}

export const Header: React.FC<HeaderProps> = ({ user, disabledSearch }) => {
    const isMobile = useMediaQuery({maxWidth: 600})

    const userDrawer = useUser().drawer
    const menuDrawer = useMenu().drawer

    const { darkMode } = useDarkMode()
    const { onSearch, placeholder } = useSearch()

    const [searchValue, setSearchValue] = useState("")

    const iconButtonStyle: SxProps = {
        width: isMobile ? '16vw' : '4vw',
        height: isMobile ? '16vw' : '4vw',
    }

    const iconStyle: SxProps = {
        height: "100%",
        width: "100%"
    }

    const containerStyle: SxProps = {
        gap: "1vw",
        alignItems: "center",
        color: "secondary.main",
        fontWeight: "bold",
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
    }

    useEffect(() => {
        if (onSearch) onSearch(searchValue)
    }, [searchValue, onSearch])

    return (
        <Box
            sx={{
                height: "10vh",
                width: "100vw",
                backgroundColor: "background.paper",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1vw",
                gap: isMobile ? "4vw" : "2vw",
            }}
        >
            <Box sx={containerStyle}>
                <IconButton color={"secondary"} sx={iconButtonStyle} onClick={() => menuDrawer.toogle()}>
                    <MenuIcon sx={iconStyle} />
                </IconButton>
                <img src={logo} alt="boz" style={{ width: isMobile ? "12vw" : "3.5vw" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
                <TextField
                    value={searchValue}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder={`pesquisar ${placeholder}`}
                    color={"secondary"}
                    sx={textFieldStyle}
                    InputProps={{
                        color: "secondary",
                        sx: { color: darkMode ? "text.primary" : "secondary.main", gap: "0.5vw" },
                        startAdornment: <SearchIcon />,
                        endAdornment: (
                            <IconButton
                            color="secondary"
                            onClick={() => setSearchValue("")}
                            style={{ padding: isMobile ? "0" : "" }}
                            >
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                    InputLabelProps={{ color: "secondary" }}
                    variant="standard"
                    autoComplete="off"
                    disabled={disabledSearch}
                />
            </Box>

            <Box sx={containerStyle}>
                <p style={{ display: isMobile ? "none" : "" }}>{user.name}</p>
                <IconButton color={"secondary"} sx={iconButtonStyle} onClick={() => userDrawer.toogle()}>
                    <Avatar user={user} size={Number(iconStyle.width)} small noClickModal />
                </IconButton>
            </Box>
        </Box>
    )
}
