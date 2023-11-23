import React, { useEffect, useState } from "react"
import { Box, IconButton, Paper, darken, lighten, useMediaQuery } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useDarkMode } from "../../../hooks/useDarkMode"
import { useColors } from "../../../hooks/useColors"
import { useUser } from "../../../hooks/useUser"
import { DepartmentForm } from "./DepartmentForm"
import { UsersToolip } from "../../Profile/UsersTooltip"
import { UserAvatar } from "../Stats/StatusLogs"

interface DepartmentContainerProps {
    department: Department
}

export const DepartmentContainer: React.FC<DepartmentContainerProps> = ({ department }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const colors = useColors()

    const { darkMode } = useDarkMode()
    const { list } = useUser()
    const users = list.filter((user) => user.department.id == department.id)

    const [editing, setEditing] = useState(false)
    const [viewEmployees, setViewEmployees] = useState(false)

    const onUpdate = () => {
        setEditing(false)
    }

    useEffect(() => {
        if (viewEmployees) {
            setTimeout(() => {
                setViewEmployees(false)
            }, 2000)
        }
    }, [viewEmployees])

    return editing ? (
        <DepartmentForm department={department} finish={onUpdate} />
    ) : (
        <Box
            key={department.id}
            sx={{
                width: isMobile ? "80vw" : "21.5vw",
                borderBottom: "2px solid",
                borderRadius:"0.2vw",
                padding: "1vw",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                gap: "1vw",
                boxShadow: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px",
            }}
        >
            {department.name}
            <Box
                sx={{
                    padding: isMobile ? "3vw" : "0.5vw",
                    cursor: "default",
                    borderRadius: "50%",
                    fontSize: isMobile ? "4vw" : "0.7vw",
                    minWidth: isMobile ? "9vw" : "1.5vw",
                    height: isMobile ? "9vw" : "1.5vw",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "secondary.main",
                    bgcolor: darkMode ? darken(colors.primary, 0.5) : lighten(colors.primary, 0.4),
                }}
                onClick={viewEmployees ? () => setViewEmployees(false) : () => setViewEmployees(true)}
            >
                {users.length}
            </Box>
            {viewEmployees && (
                <Paper
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "3vw" : "0.3vw",
                        bgcolor: "background.default",
                        padding: isMobile ? "5vw" : "0.5vw",
                        color: "text.secondary",
                        position: "absolute",
                        top: isMobile ? "10vw" : "3vw",
                        zIndex: 2,
                    }}
                >
                    {users.map((user) => (
                        <UserAvatar user={user} avatarSize="2vw" />
                    ))}
                </Paper>
            )}
            <IconButton
                color="primary"
                sx={{ width: "1.5vw", height: "1.5vw", marginLeft: "auto" }}
                onClick={() => setEditing(true)}
            >
                <EditIcon />
            </IconButton>
        </Box>
    )
}
