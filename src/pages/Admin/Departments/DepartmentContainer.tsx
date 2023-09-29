import React, { useState } from "react"
import { Box, IconButton, darken, lighten, useMediaQuery } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useDarkMode } from "../../../hooks/useDarkMode"
import { useColors } from "../../../hooks/useColors"
import { useUser } from "../../../hooks/useUser"
import { DepartmentForm } from "./DepartmentForm"
import { UsersToolip } from "../../Profile/UsersTooltip"

interface DepartmentContainerProps {
    department: Department
}

export const DepartmentContainer: React.FC<DepartmentContainerProps> = ({ department }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const colors = useColors()

    const { darkMode } = useDarkMode()
    const { list } = useUser()
    const users = list.filter((user) => user.department.id == department.id)

    const [mouseIn, setMouseIn] = useState(false)
    const [editing, setEditing] = useState(false)

    const onUpdate = () => {
        setEditing(false)
        setMouseIn(false)
    }

    return editing ? (
        <DepartmentForm department={department} finish={onUpdate} />
    ) : (
        <Box
            key={department.id}
            sx={{
                width: isMobile? "80vw" : "21.5vw",
                borderRadius: "1vw",
                borderBottom: "2px solid",
                padding: "1vw",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                gap: "1vw",
            }}
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}
        >
            {department.name}
            {mouseIn && (
                <IconButton color="primary" sx={{ width: "1.5vw", height: "1.5vw", marginLeft: "auto" }} onClick={() => setEditing(true)}>
                    <EditIcon />
                </IconButton>
            )}
            <UsersToolip users={users}>
                <Box
                    sx={{
                        padding: isMobile? "3vw" : "0.5vw",
                        cursor: "default",
                        borderRadius: "50%",
                        fontSize: isMobile? "4vw" : "0.7vw",
                        minWidth: isMobile? "9vw" : "1.5vw",
                        height: isMobile? "9vw" : "1.5vw",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "secondary.main",
                        bgcolor: darkMode ? darken(colors.primary, 0.5) : lighten(colors.primary, 0.4),
                    }}
                >
                    {users.length}
                </Box>
            </UsersToolip>
        </Box>
    )
}
