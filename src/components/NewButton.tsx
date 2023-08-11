import React from "react"
import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

interface NewButtonProps {
    onClick: () => void
    top?: string | number
    left?: string | number
    bottom?: string | number
    right?: string | number
}

export const NewButton: React.FC<NewButtonProps> = ({ top, left, bottom, right, onClick }) => {
    return (
        <Button
            sx={{ borderRadius: "50%", position: "fixed", top, left, bottom, right, color: "secondary.main", width: "5vw", height: "5vw" }}
            variant="contained"
            onClick={onClick}
        >
            <AddIcon sx={{ width: "100%", height: "100%" }} />
        </Button>
    )
}
