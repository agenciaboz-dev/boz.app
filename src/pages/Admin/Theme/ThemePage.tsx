import React from "react"
import { Box, Button, CircularProgress, IconButton, Paper } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { TaiTextField } from "../../../components/TaiTextField"
import { ColorInput } from "@mantine/core"
import { Warning } from "@mui/icons-material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface ThemePageProps {
    user: User
}

export const ThemePage: React.FC<ThemePageProps> = ({ user }) => {
    const navigate = useNavigate()
    const theme: Theme | undefined = useLocation().state.theme
    if (!theme) {
        navigate("/admin/themes")
        return null
    }

    const io = useIo()
    const formik = useFormik({
        initialValues: theme,
        onSubmit: (values) => {
            const data = { ...values, userId: user.id }

            io.emit("theme:update", data)
            console.log({ data })
        }
    })

    const color_input_style = {
        input: { backgroundColor: "transparent", border: "1px solid", color: theme.primary },
        dropdown: { backgroundColor: theme.background.primary, border: "transparent" }
    }

    return theme ? (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ padding: "2vw", width: "40%", flexDirection: "column", height: "80vh", overflowY: "auto", gap: "2vw" }}>
                {theme.name}
                <TaiTextField label="nome" value={formik.values.name} name="name" onChange={formik.handleChange} />
                <Box sx={{ width: "100%", gap: "1vw" }}>
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                        <ColorInput
                            label={"primary"}
                            value={formik.values.primary}
                            name={"primary"}
                            onChange={(newValue) => formik.setFieldValue("primary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"secondary"}
                            value={formik.values.secondary}
                            name={"secondary"}
                            onChange={(newValue) => formik.setFieldValue("secondary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"terciary"}
                            value={formik.values.terciary}
                            name={"terciary"}
                            onChange={(newValue) => formik.setFieldValue("terciary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"success"}
                            value={formik.values.success}
                            name={"success"}
                            onChange={(newValue) => formik.setFieldValue("success", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"warning"}
                            value={formik.values.warning}
                            name={"warning"}
                            onChange={(newValue) => formik.setFieldValue("warning", newValue)}
                            styles={color_input_style}
                        />
                    </Box>
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                        <ColorInput
                            label={"background.primary"}
                            value={formik.values.background.primary}
                            name={"background.primary"}
                            onChange={(newValue) => formik.setFieldValue("background.primary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"background.secondary"}
                            value={formik.values.background.secondary}
                            name={"background.secondary"}
                            onChange={(newValue) => formik.setFieldValue("background.secondary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"text.primary"}
                            value={formik.values.text.primary}
                            name={"text.primary"}
                            onChange={(newValue) => formik.setFieldValue("text.primary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"text.secondary"}
                            value={formik.values.text.secondary}
                            name={"text.secondary"}
                            onChange={(newValue) => formik.setFieldValue("text.secondary", newValue)}
                            styles={color_input_style}
                        />
                        <ColorInput
                            label={"text.terciary"}
                            value={formik.values.text.terciary}
                            name={"text.terciary"}
                            onChange={(newValue) => formik.setFieldValue("text.terciary", newValue)}
                            styles={color_input_style}
                        />
                    </Box>
                </Box>
                <Button type="submit" variant="contained">
                    atualizar
                </Button>
            </Box>
            <Box
                sx={{
                    borderTopRightRadius: "3vw",
                    flexDirection: "column",
                    padding: "2vw",
                    alignItems: "center",
                    width: "40%",
                    gap: "1vw",
                    bgcolor: formik.values.background.primary,
                    color: formik.values.text.primary
                }}>
                <p style={{ fontSize: "4rem" }}>BOZ</p>
                <Button variant="contained" sx={{ bgcolor: formik.values.primary, pointerEvents: "none" }}>
                    primary
                </Button>
                <CircularProgress sx={{ color: formik.values.primary }} />
                <Button variant="contained" sx={{ bgcolor: formik.values.secondary, pointerEvents: "none" }}>
                    secondary
                </Button>
                <CircularProgress sx={{ color: formik.values.secondary }} />

                <Paper
                    sx={{
                        padding: "1vw",
                        width: "100%",
                        gap: "1vw",
                        bgcolor: formik.values.background.secondary,
                        color: formik.values.secondary,
                        alignItems: "center"
                    }}>
                    <IconButton>
                        <Warning sx={{ color: formik.values.warning }} />
                    </IconButton>
                    <IconButton>
                        <CheckCircleIcon sx={{ color: formik.values.success }} />
                    </IconButton>
                    secondary
                </Paper>
            </Box>
        </form>
    ) : (
        <></>
    )
}
