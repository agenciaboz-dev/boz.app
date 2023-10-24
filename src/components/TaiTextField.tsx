import React from "react"
import { SxProps, TextField, InputProps, TextFieldProps } from "@mui/material"
import { textFieldStyle } from "../style/textfield"
import { useColors } from "../hooks/useColors"
import { useMuiTheme } from "../hooks/useMuiTheme"

export const TaiTextField: React.FC<TextFieldProps> = (props) => {
    const colors = useColors()
    const background = useMuiTheme()

    const webkitbg: SxProps = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.primary} inset`,
            borderRadius: "initial",
        },
    }

    return <TextField {...props} sx={{ ...textFieldStyle, ...webkitbg }} />
}
