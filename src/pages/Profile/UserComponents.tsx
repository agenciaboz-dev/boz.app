import React from "react"
import { Box, Skeleton, lighten, useMediaQuery } from "@mui/material"
import { useColors } from "../../hooks/useColors"

export const Data: React.FC<{
    icon: React.ReactElement
    title: string
    value: React.ReactNode
    style?: CSSStyleDeclaration
}> = ({ icon, title, value }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const Icon = () => icon
    const colors = useColors()
    const color = lighten(colors.text.secondary, 0.35)

    return !value ? (
        <Skeleton variant="rounded" sx={{ width: "20vw", height: "2vw" }} animation="wave" />
    ) : (
        <Box
            sx={{
                gap: isMobile ? "2vw" : "0.4vw",
                alignItems: "center",
                color,
                fontSize: isMobile ? "4vw" : "1vw",
                width: isMobile ? "100%" : "30vw",
            }}
        >
            <Icon />
            <p style={{ fontWeight: "bold" }}>{title}:</p>
            {value}
        </Box>
    )
}

export const Title: React.FC<{ name: string; right?: React.ReactNode }> = ({ name, right }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    return (
        <Box
            sx={{
                color: lighten(colors.text.secondary, 0.3),
                fontWeight: "bold",
                borderBottom: "1px solid",
                paddingBottom: isMobile ? "3vw" : "0.5vw",
                width: "100%",
                fontSize: isMobile ? "6vw" : "1.1vw",
                justifyContent: isMobile ? "center" : "space-between",
                alignItems: "center",
            }}
        >
            <p style={{ color: colors.primary }}>{name}</p>
            {right}
        </Box>
    )
}

export const Container: React.FC<{ children: React.ReactNode; titleChildren?: React.ReactNode; name: string }> = ({
    children,
    titleChildren,
    name,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
            <Box sx={{ flexDirection: "row", width: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Title name={name} />
                {titleChildren}
            </Box>
            <Box sx={{ gap: isMobile ? "3vw" : "0.7vw", width: "100%", flexWrap: "wrap", justifyContent: "space-between" }}>
                {children}
            </Box>
        </Box>
    )
}
