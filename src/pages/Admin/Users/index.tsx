import React from "react"
import { Box } from "@mui/material"
import { RoleContainer } from "./RoleContainer"
import { NewButton } from "../../../components/NewButton"
import { useDepartments } from "../../../hooks/useDepartments"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    const { departments } = useDepartments()

    const handleNewUserClick = () => {}

    return (
        <Box sx={{ padding: "2vw", width: "100%", gap: "1vw" }}>
            <NewButton onClick={handleNewUserClick} bottom={"2vw"} right={"2vw"} />
            {departments.map((department) => (
                <RoleContainer key={department.id} department={department} />
            ))}
        </Box>
    )
}
