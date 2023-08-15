import React from "react"
import { Button } from "@mui/material"

interface NewButtonProps {
    onClick: () => void
    top?: string | number
    left?: string | number
    bottom?: string | number
    right?: string | number
    icon?: React.ReactElement
}

export const NewButton: React.FC<NewButtonProps> = ({ top, left, bottom, right, onClick, icon }) => {
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
            }}
            variant="contained"
            onClick={onClick}
        >
            <Icon />
        </Button>
    )
}
