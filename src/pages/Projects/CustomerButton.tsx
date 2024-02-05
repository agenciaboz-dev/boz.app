import React, { useMemo, useState } from "react"
import { Box, Collapse, MenuItem, useMediaQuery } from "@mui/material"
import { ProjectButton } from "./ProjectButton"
import { Label } from "../Tools/Wakeup/Label"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import { getWorkers } from "../Tools/project/getWorkers"
import { getYouWorking } from "../Tools/project/getYouWorking"
import { useUser } from "../../hooks/useUser"
import { UsersToolip } from "../Profile/UsersTooltip"

interface CustomerButtonProps {
    customer: Customer
}

export const CustomerButton: React.FC<CustomerButtonProps> = ({ customer }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const currentProjectId = useLocation().pathname.split("projects/")[1]?.split("/")[0]
    const active = !!customer.projects.find((project) => project.id == Number(currentProjectId))
    const { user } = useUser()

    const current_working = useMemo(
        () =>
            customer.projects
                .filter((project) => !!getWorkers(project).length)
                .map((project) => getWorkers(project))
                .flatMap((item) => item),
        [customer]
    )
    const you_working = useMemo(() => customer.projects.find((project) => getYouWorking(project, user)), [customer])

    const [showProjects, setShowProjects] = useState(active)

    return (
        <>
            <MenuItem
                sx={{
                    width: "100%",
                    justifyContent: "space-between",
                }}
                onClick={() => {
                    setShowProjects((show) => !show)
                }}
            >
                <p
                    style={{
                        width: isMobile ? "100%" : "10vw",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {customer.name}
                </p>
                <Box sx={{ gap: "0.5vw" }}>
                    {!!current_working?.length && (
                        <UsersToolip users={current_working.map((worker) => worker.user)}>
                            <Label label={current_working.length.toString()} color={you_working ? "success" : "warning"} />
                        </UsersToolip>
                    )}
                    <KeyboardArrowDown sx={{ rotate: showProjects ? "-180deg" : 0, transition: "0.3s" }} />
                </Box>
            </MenuItem>
            <Collapse in={active || showProjects}>
                {customer.projects.map((project) => (
                    <ProjectButton key={project.id} project={project} />
                ))}
            </Collapse>
        </>
    )
}
