import React, { useState } from "react"
import { Box, Button, CircularProgress, IconButton, SxProps, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import logo from "../assets/logo.png"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useUser } from "../hooks/useUser"
import { useColors } from "../hooks/useColors"
import { ModeToggler } from "../components/ModeToggler"
import { textFieldStyle } from "../style/textfield"
import { useMediaQuery } from "@mui/material"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const colors = useColors()
    const { login } = useUser()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const webkitbg = {
        "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            "-webkit-box-shadow": ` 0 0 0 100px ${colors.background.primary} inset`,
            borderRadius: "initial",
        },
    }

    const initialValues: LoginForm = {
        login: "",
        password: "",
    }

    const handleSubmit = (values: LoginForm) => {
        if (loading) return

        login(values, setLoading)
    }

    return (
        <Box
            sx={{
                backgroundColor: "background.paper",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: isMobile ? "10vw" : "5vw",
            }}
        >
            <img src={logo} alt="agência boz" style={{ aspectRatio: "2/1", width: isMobile ? "70vw" : "24vw" }} />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <Box
                            sx={{
                                padding: isMobile ? "6vw" : "3vw",
                                width: isMobile ? "80vw" : "30vw",
                                backgroundColor: "background.default",
                                borderRadius: isMobile ? "5vw" : "2.5vw",
                                flexDirection: "column",
                                gap: isMobile ? "4vw" : "1vw",
                            }}
                        >
                            <TextField
                                label="login"
                                name="login"
                                value={values.login}
                                onChange={handleChange}
                                placeholder="nome de usuário, email ou cpf"
                                autoComplete="off"
                                required
                                sx={{ ...textFieldStyle, ...webkitbg }}
                            />
                            <TextField
                                label="senha"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                required
                                sx={{ ...textFieldStyle, ...webkitbg }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)} color="primary">
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    color: "secondary.main",
                                    fontWeight: "bold",
                                    // width: "50%",
                                    // alignSelf: "flex-end",
                                }}
                            >
                                {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "entrar"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <ModeToggler top={0} right={0} />
        </Box>
    )
}
