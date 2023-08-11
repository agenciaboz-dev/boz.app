import React from "react"
import { Box } from "@mui/material"
import { RoleContainer } from "./RoleContainer"
import { NewButton } from "../../../components/NewButton"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    const handleNewUserClick = () => {}

    return (
        <Box sx={{ flexDirection: "column", padding: "2vw", width: "100%" }}>
            <NewButton onClick={handleNewUserClick} bottom={"2vw"} right={"2vw"} />
            <RoleContainer />
        </Box>
    )
}
