import React from "react"
import { Box } from "@mui/material"
import { ContainerWrapper } from "./ContainerWrapper"

interface TasksContainerProps {}

export const TasksContainer: React.FC<TasksContainerProps> = ({}) => {
    return (
        <ContainerWrapper>
            <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Tarefinhas aparacerão aqui</Box>
        </ContainerWrapper>
    )
}
