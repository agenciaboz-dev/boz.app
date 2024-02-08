import React from "react"
import { IconButton, TextField, Tooltip } from "@mui/material"
import { OpenInNew } from "@mui/icons-material"

interface LinkContainerProps {
    link: Link
}

export const LinkContainer: React.FC<LinkContainerProps> = ({ link }) => {
    const onClick = () => {
        window.open(link.url, "_new")
    }

    return (
        <Tooltip title={link.url} placement="top">
            <TextField
                onClick={onClick}
                variant="standard"
                value={link.name || link.url}
                inputProps={{ sx: { cursor: "pointer", color: "text.secondary" } }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <IconButton>
                            <OpenInNew />
                        </IconButton>
                    ),
                    sx: { cursor: "pointer" },
                }}
            />
        </Tooltip>
    )
}
