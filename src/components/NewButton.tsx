import React from "react"
import { AlertColor, Button, CircularProgress, useMediaQuery } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"

interface NewButtonProps {
    onClick: () => void
    top?: string | number
    left?: string | number
    bottom?: string | number
    right?: string | number
    icon?: React.ReactElement
    color?: AlertColor
    loading?: boolean
}

export const NewButton: React.FC<NewButtonProps> = ({ top, left, bottom, right, onClick, icon, color, loading }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const Icon = () => icon || <></>

    return (
        <Button
            sx={{
                borderRadius: "50%",
                position: "absolute",
                top,
                left,
                bottom,
                right,
                color: "secondary.main",
                width: isMobile? "15vw" : "4vw",
                height: isMobile? "15vw" : "4vw",
                zIndex: 2,
                justifyContent: "center",
                alignItems: "center",
            }}
            variant="contained"
            color={color}
            onClick={onClick}
        >
            {loading ? <CircularProgress color={"secondary"} size="1.5rem" /> : <Icon />}
        </Button>
    )
}
