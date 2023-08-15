import React from "react"
import { Box, Paper, darken, lighten } from "@mui/material"
import { backgroundStyle } from "../../../style/background"
import { Roles } from "./Roles"
import { useDepartments } from "../../../hooks/useDepartments"
import { useUser } from "../../../hooks/useUser"
import { useColors } from "../../../hooks/useColors"
import { useDarkMode } from "../../../hooks/useDarkMode"

interface DeparmentsProps {
    user: User
}

export const Deparments: React.FC<DeparmentsProps> = ({ user }) => {
    const colors = useColors()

    const { departments } = useDepartments()
    const { list } = useUser()
    const { darkMode } = useDarkMode()

    return (
        <Box sx={{ ...backgroundStyle, padding: "2vw", gap: "2vw" }}>
            <Roles />

            <Paper sx={{ gap: "1vw", bgcolor: "background.default", padding: "1vw" }}>
                {departments.map((department) => {
                    const users = list.filter((user) => user.department.id == department.id)

                    return (
                        <Box
                            key={department.id}
                            sx={{
                                width: "25vw",
                                borderRadius: "1vw",
                                borderBottom: "2px solid",
                                padding: "1vw",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {department.name}
                            <Box
                                sx={{
                                    padding: "0.5vw",
                                    borderRadius: "50%",
                                    fontSize: "0.7vw",
                                    minWidth: "1.5vw",
                                    height: "1.5vw",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "secondary.main",
                                    bgcolor: darkMode ? darken(colors.primary, 0.5) : lighten(colors.primary, 0.4),
                                }}
                            >
                                {users.length}
                            </Box>
                        </Box>
                    )
                })}
            </Paper>
        </Box>
    )
}
