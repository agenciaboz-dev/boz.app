import React from "react"
import { AlertColor, Button } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"

interface NewButtonProps {
    onClick: () => void
    top?: string | number
    left?: string | number
    bottom?: string | number
    right?: string | number
    icon?: React.ReactElement
    color?: AlertColor
}

export const NewButton: React.FC<NewButtonProps> = ({ top, left, bottom, right, onClick, icon, color }) => {
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
                width: "3vw",
                height: "4vw",
                zIndex: 2,
            }}
            variant="contained"
            color={color}
            onClick={onClick}
        >
            <Icon />
        </Button>
    )
}
