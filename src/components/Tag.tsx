import React from "react"
import { Box } from "@mui/material"
import colors from "../style/colors"

interface TagProps {
    name: string
    style?: string
    variant: string
}

export const Tag: React.FC<TagProps> = ({ name, style, variant }) => {
    const color = {
        dev: "#D2FFB6",
        agent: "#E2EAFF",
        shipping: "#FFFDC7",
        business: "#F0C7FF",
        store: "#F0C7FF",
        service: "#C7FFF5",
        adm: "#FC5F5C",
    }

    return (
        <Box
            sx={{
                fontSize: `${style}`,
                width: "max-content",
                backgroundColor: colors.primary,
                //backgroundColor: `${colors[variant]}`,
                borderRadius: "7vw",
                padding: "0.5vw",
                color: colors.secondary,
            }}
        >
            {name}
        </Box>
    )
}
