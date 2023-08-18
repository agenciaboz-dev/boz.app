import React from "react"
import { SxProps, TextField, InputProps } from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import { useColors } from "../hooks/useColors"
import { useMuiTheme } from "../hooks/useMuiTheme"

interface TaiTextFieldProps {
    label: string
    name: string
    value: any
    onChange: {
        (e: React.ChangeEvent<any>): void
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void
    }
    placeholder?: string
    required?: boolean
    style?: SxProps 
    disabled?: boolean
    InputProps?: InputProps
}

export const TaiTextField: React.FC<TaiTextFieldProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required,
    style,
    disabled,
    InputProps,
}) => {
    const colors = useColors()
    const background = useMuiTheme()

    const webkitbg: SxProps = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.primary} inset`,
            borderRadius: "initial",
        },
    }

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            //autoComplete="off"
            required={required}
            sx={{ ...textFieldStyle, ...webkitbg, ...(style && style) }}
            disabled={disabled}
            InputProps={InputProps}
        />
    )
}
