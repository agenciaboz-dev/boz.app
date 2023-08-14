import React from "react"
import { Box, TextField } from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import { useColors } from "../hooks/useColors"

interface TaiTextFieldProps {
    label: string
    name: string
    value: any
    onChange: () => {}
    placeholder?: string
    required: boolean
}

export const TaiTextField: React.FC<TaiTextFieldProps> = ({ label, name, value, onChange, placeholder, required }) => {
    const colors = useColors()

    const webkitbg = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.primary} inset`,
            borderRadius: "inherit",
        },
    }

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            sx={{ ...textFieldStyle, ...webkitbg }}
        />
    )
}
