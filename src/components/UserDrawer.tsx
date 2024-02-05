import React from "react"
import { Box, Drawer, MenuItem, Switch, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { backdropStyle } from "../style/backdrop"
import { ModeToggler } from "./ModeToggler"
import { Avatar } from "./Avatar"
import colors from "../style/colors"
import { useNavigate } from "react-router-dom"
import DuoIcon from "@mui/icons-material/Duo"
import ChairIcon from "@mui/icons-material/Chair"
import { useMediaQuery } from "@mui/material"
import { Stopwatch } from "./Stopwatch"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import LocalPizzaIcon from "@mui/icons-material/LocalPizza"
import LunchDiningIcon from "@mui/icons-material/LunchDining"
import { CoffeeSwitch } from "./CoffeeSystem/CoffeeSwitch"
import { WorkingShortcut } from "./WorkingShortcut"

interface UserDrawerProps {}

export const UserDrawer: React.FC<UserDrawerProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { user, drawer, updateStatus } = useUser()
    const navigate = useNavigate()

    const switchWrapperStyle: SxProps = {
        flexDirection: "column",
        color: "secondary.main",
        alignItems: "center",
        flexShrink: 0,
        flex: 1,
    }

    const handleClose = () => {
        drawer.close()
    }

    return (
        <Drawer
            anchor={"right"}
            open={drawer.open}
            onClose={handleClose}
            PaperProps={{ sx: { width: isMobile ? "80vw" : "22vw", backgroundColor: "background.paper" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box
                sx={{
                    padding: isMobile ? "6vw" : "2vw",
                    flexDirection: "column",
                    gap: isMobile ? "4vw" : "1vw",
                    width: "100%",
                    alignItems: "center",
                }}
                color={"secondary.main"}
            >
                {user && <Avatar user={user} size="10vw" />}
                <p style={{ fontWeight: "bold", textAlign: "center" }}>{user?.name}</p>
                <Box
                    sx={{
                        fontSize: isMobile ? "4vw" : "1.5vw",
                        color: colors.secondary,
                        cursor: "pointer",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => {
                        navigate(`/profile`)
                        handleClose()
                    }}
                >
                    @{user?.username}
                </Box>
            </Box>
            <Box sx={{ justifyContent: "space-evenly", width: "100%" }}>
                <Box sx={switchWrapperStyle}>
                    Reunião
                    <Switch color="info" checked={user?.status == 2} onChange={() => updateStatus(2)} icon={<DuoIcon />} checkedIcon={<DuoIcon />} />
                    {user?.status == 2 && <Stopwatch />}
                </Box>
                <Box sx={switchWrapperStyle}>
                    Pausa
                    <Switch
                        color="warning"
                        checked={user?.status == 3}
                        onChange={() => updateStatus(3)}
                        icon={<ChairIcon />}
                        checkedIcon={<ChairIcon />}
                    />
                    {user?.status == 3 && <Stopwatch />}
                </Box>
                <Box sx={switchWrapperStyle}>
                    Almoço
                    <Switch
                        color="error"
                        checked={user?.status == 4}
                        onChange={() => updateStatus(4)}
                        icon={<LunchDiningIcon />}
                        checkedIcon={<LunchDiningIcon />}
                    />
                    {user?.status == 4 && <Stopwatch />}
                </Box>
            </Box>

            {user && <WorkingShortcut user={user} />}

            <CoffeeSwitch bottom={"3vw"} />
            <ModeToggler bottom={0} right="6vw" />
        </Drawer>
    )
}
