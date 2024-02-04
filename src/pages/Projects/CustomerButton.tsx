import React, { useMemo, useState } from "react"
import { Box, Collapse, MenuItem, useMediaQuery } from "@mui/material"
import { ProjectButton } from "./ProjectButton"
import { Label } from "../Tools/Wakeup/Label"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useLocation } from "react-router-dom"

interface CustomerButtonProps {
    customer: Customer
}

export const CustomerButton: React.FC<CustomerButtonProps> = ({ customer }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const currentProjectId = useLocation().pathname.split("projects/")[1]?.split("/")[0]
    const active = !!customer.projects.find((project) => project.id == Number(currentProjectId))
    const any_working = useMemo(
        () =>
            !!customer.projects.find((project) =>
                project.workers.find((worker) => !!worker.times.length && !worker.times[worker.times.length - 1].ended)
            ),
        [customer]
    )

    const [showProjects, setShowProjects] = useState(active)

    return (
        <>
            <MenuItem
                sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    pointerEvents: active ? "none" : "",
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
                    <Box sx={{ gap: isMobile ? "5vw" : "0.5vw" }}>
                        <Label label={customer.projects.length.toString()} color={any_working ? "success" : "warning"} />
                    </Box>
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
