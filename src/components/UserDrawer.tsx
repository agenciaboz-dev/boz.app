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

interface UserDrawerProps {}

export const UserDrawer: React.FC<UserDrawerProps> = ({}) => {
    const { user, drawer, updateStatus } = useUser()
    const navigate = useNavigate()

    const switchWrapperStyle: SxProps = { flexDirection: "column", color: "secondary.main", alignItems: "center" }

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
            <Box
                sx={{ padding: "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }}
                color={"secondary.main"}
            >
                <Avatar user={user!} size="10vw" />
                <p style={{ fontWeight: "bold" }}>{user?.name}</p>
                <Box
                    sx={{
                        fontSize: "1.0vw",
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
            <Box sx={{ justifyContent: "space-evenly" }}>
                <Box sx={switchWrapperStyle}>
                    Reunião
                    <Switch
                        color="error"
                        checked={user?.status == 2}
                        onChange={() => updateStatus(2)}
                        icon={<DuoIcon />}
                        checkedIcon={<DuoIcon />}
                    />
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
                </Box>
            </Box>

            <ModeToggler bottom={0} right="6vw" />
        </Drawer>
    )
}
