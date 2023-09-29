import React from "react"
import { Box, IconButton, Paper, useMediaQuery } from "@mui/material"
import { useDepartments } from "../../../hooks/useDepartments"
import { Tag } from "../../../components/Tag"
import AddIcon from "@mui/icons-material/Add"

interface RolesProps {}

export const Roles: React.FC<RolesProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const { roles, roleModal } = useDepartments()

    return (
        <Paper sx={{ gap: isMobile ? "5vw" : "1vw", bgcolor: "background.default", flexDirection: "column", padding: isMobile? "5vw" : "1vw" }}>
            <p style={{ fontWeight: "bold", fontSize: isMobile ? "6vw" : "1vw", textAlign: isMobile? "center" : "start" }}>Funções</p>
            <Box sx={{ gap: isMobile? "2vw" : "0.5vw", alignItems: "center", flexWrap: "wrap", lineHeight: isMobile ? "4vw" : "" }}>
                {roles.map((role) => (
                    <Tag key={role.id} name={role.tag} tooltip={role.name} fontSize={isMobile? "4vw" : "0.8vw"}
                        sx={{
                            padding: isMobile ? "2vw" : "0.5vw"
                        }}
                    />
                ))}
                <IconButton color="primary" sx={{ width: "2vw", height: "2vw" }} onClick={() => roleModal.open()}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}
