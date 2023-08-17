import React from "react"
import { Box } from "@mui/material"
import { RoleContainer, RoleSkeletons } from "./RoleContainer"
import { useDepartments } from "../../../hooks/useDepartments"

interface UserListProps {
    list: User[]
}

export const UserList: React.FC<UserListProps> = ({ list }) => {
    const { departments, loading } = useDepartments()

    return loading ? (
        <RoleSkeletons />
    ) : (
        <>
            {departments.map((department) => (
                <RoleContainer key={department.id} department={department} users={list} />
            ))}
        </>
    )
}
