import React from "react"
import { Badge, Box, MenuItem, Paper, Skeleton } from "@mui/material"
import { Avatar } from "../../../components/Avatar"
import { useNavigate } from "react-router-dom"
import { useArray } from "burgos-array"
import { Tag } from "../../../components/Tag"

interface RoleContainerProps {
    department: Department
    users: User[]
}

export const RoleContainer: React.FC<RoleContainerProps> = ({ department, users }) => {
    const navigate = useNavigate()
    const userList = users.filter((user) => user.department.id == department.id)

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", color: "primary.main", width: "30vw" }}>
            <p style={{ fontWeight: "bold" }}>{department.name}</p>

            <Paper sx={{ flexDirection: "column", bgcolor: "background.default" }}>
                {userList.map((user) => (
                    <MenuItem
                        key={user.id}
                        sx={{ alignItems: "center", gap: "1vw", color: "text.secondary" }}
                        onClick={() => {
                            navigate(`/admin/users/${user.username}`)
                        }}
                    >
                        <Avatar size={"3vw"} small user={user} />
                        <p style={{ fontWeight: "bold" }}>{user.name}</p>

                        <Box sx={{ marginLeft: "auto", gap: "0.2vw" }}>
                            {user.roles.map((role) => (
                                <Tag key={role.id} name={role.tag} sx={{ fontSize: "0.75vw", padding: "0.2vw 0.4vw", borderRadius: "0.75vw" }} />
                            ))}
                        </Box>
                    </MenuItem>
                ))}
            </Paper>
        </Box>
    )
}

export const RoleSkeletons = () => {
    const skeletons = useArray().newArray(3)

    return (
        <Box sx={{ gap: "1vw" }}>
            {skeletons.map((index) => (
                <Skeleton key={index} variant="rounded" animation="wave" sx={{ height: "50vw", width: "30vw" }} />
            ))}
        </Box>
    )
}
