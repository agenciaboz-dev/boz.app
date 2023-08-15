import React from "react"
import { Box, IconButton, Paper } from "@mui/material"
import { useDepartments } from "../../../hooks/useDepartments"
import { Tag } from "../../../components/Tag"
import AddIcon from "@mui/icons-material/Add"

interface RolesProps {}

export const Roles: React.FC<RolesProps> = ({}) => {
    const { roles, roleModal } = useDepartments()

    return (
        <Paper sx={{ gap: "1vw", bgcolor: "background.default", flexDirection: "column", padding: "1vw" }}>
            <p style={{ fontWeight: "bold" }}>Funções</p>
            <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                {roles.map((role) => (
                    <Tag key={role.id} name={role.tag} fontSize="0.8vw" />
                ))}
                <IconButton color="primary" sx={{ width: "2vw", height: "2vw" }} onClick={() => roleModal.open()}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}
