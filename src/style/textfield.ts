import { SxProps } from "@mui/material"

export const textFieldStyle: SxProps = {
    "& .MuiInputLabel-root": {
        color: "grey",
    },

    // não funciona
    "& .MuiInputLabel-root:focus": {
        color: "primary.main",
    },

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            // borderColor: "primary.main",
        },
    },

    "& .MuiInput-root": {
        "&::before": {
            borderColor: "secondary.main",
        },
    },
    "& .MuiInput-root:hover": {
        "&::before": {
            borderColor: "secondary.main",
        },
    },
}
