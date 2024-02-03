import React, { useState } from "react"
import { Box, IconButton, Paper, useMediaQuery } from "@mui/material"
import { useDepartments } from "../../../hooks/useDepartments"
import { Tag } from "../../../components/Tag"
import AddIcon from "@mui/icons-material/Add"
import { RoleModal } from "../../../components/RoleModal"

interface RolesProps {}

export const Roles: React.FC<RolesProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const { roles, roleModal } = useDepartments()

    const [currentRole, setCurrentRole] = useState<Role>()

    const onRoleClick = (role: Role) => {
        setCurrentRole(role)
        roleModal.open()
    }

    const onNewRoleClick = () => {
        setCurrentRole(undefined)
        roleModal.open()
    }

    return (
        <Box
            sx={{
                gap: isMobile ? "5vw" : "1vw",
                bgcolor: "background.default",
                flexDirection: "column",
                padding: isMobile ? "5vw" : "2vw",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "0 3vw",
            }}
        >
            <p style={{ fontWeight: "bold", fontSize: isMobile ? "6vw" : "1.5vw", textAlign: isMobile ? "center" : "start" }}>Funções</p>
            <Box
                sx={{
                    gap: isMobile ? "2vw" : "0.5vw",
                    alignItems: "center",
                    flexWrap: "wrap",
                    lineHeight: isMobile ? "4vw" : "",
                }}
            >
                {roles.map((role) => (
                    <Tag
                        key={role.id}
                        name={role.tag}
                        tooltip={role.name}
                        fontSize={isMobile ? "4vw" : "0.8vw"}
                        onClick={() => onRoleClick(role)}
                        sx={{
                            padding: isMobile ? "2vw" : "0.5vw",
                        }}
                    />
                ))}
                <IconButton color="primary" sx={{ width: "2vw", height: "2vw" }} onClick={onNewRoleClick}>
                    <AddIcon />
                </IconButton>
            </Box>
            <RoleModal current_role={currentRole} />
        </Box>
    )
}
