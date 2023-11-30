import React from "react"
import { Box, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface ListProps {
    themes: Theme[]
}

export const List: React.FC<ListProps> = ({ themes }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ flexDirection: "column" }}>
            {themes.map((item) => (
                <MenuItem key={item.id} onClick={() => navigate(`/admin/themes/${item.name}`, { state: { theme: item } })}>
                    {item.name}
                </MenuItem>
            ))}
        </Box>
    )
}
