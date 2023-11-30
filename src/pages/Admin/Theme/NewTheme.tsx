import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useTheme } from "../../../hooks/useTheme"
import { ColorInput } from "@mantine/core"
import { TaiTextField } from "../../../components/TaiTextField"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Warning } from "@mui/icons-material"
import { useIo } from "../../../hooks/useIo"

interface NewThemeProps {
    user: User
}

export const NewTheme: React.FC<NewThemeProps> = ({ user }) => {
    const theme = useTheme()
    const io = useIo()
    const formik = useFormik({
        initialValues: theme.current_theme,
        onSubmit: (values) => {
            const data = { ...values, userId: user.id }

            io.emit("theme:new", data)
        }
    })

    const color_input_style = {
        input: { backgroundColor: "transparent", border: "1px solid", color: theme.current_theme.primary },
        dropdown: { backgroundColor: theme.current_theme.background.primary, border: "transparent" }
    }

    useEffect(() => {
        io.on("theme:new:success", () => {})
        return () => {
            io.off("theme:new:success")
        }
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ padding: "2vw", width: "40%", flexDirection: "column", height: "80vh", overflowY: "auto", gap: "2vw" }}>
                Novo tema
                <TaiTextField label="nome" value={formik.values.name} name="name" onChange={formik.handleChange} />
                <Box sx={{ width: "100%", gap: "1vw" }}>
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                        {Object.entries(theme.current_theme).map((entry) => {
                            const key = entry[0]
                            if (key == "id" || key == "name" || key == "timestamp" || key == "background" || key == "text") {
                                return null
                            }
                            return (
                                <ColorInput
                                    key={key}
                                    label={key}
                                    // @ts-ignore
                                    value={formik.values[key]}
                                    name={key}
                                    onChange={(newValue) => formik.setFieldValue(key, newValue)}
                                    styles={color_input_style}
                                />
                            )
                        })}
                    </Box>
                    <Box sx={{ flexDirection: "column", flex: 1 }}>
                        {Object.entries(theme.current_theme).map((entry) => {
                            const key = entry[0]
                            const value = entry[1]
                            if (key == "background") {
                                return (
                                    <>
                                        {Object.entries(value).map((entry) => {
                                            const key = entry[0]
                                            return (
                                                <ColorInput
                                                    key={`background.${key}`}
                                                    label={`background.${key}`}
                                                    // @ts-ignore
                                                    value={formik.values.background[key]}
                                                    name={`background.${key}`}
                                                    onChange={(newValue) => formik.setFieldValue(`background.${key}`, newValue)}
                                                    styles={color_input_style}
                                                />
                                            )
                                        })}
                                    </>
                                )
                            }
                            return null
                        })}
                        {Object.entries(theme.current_theme).map((entry) => {
                            const key = entry[0]
                            const value = entry[1]
                            if (key == "text") {
                                return (
                                    <>
                                        {Object.entries(value).map((entry) => {
                                            const key = entry[0]
                                            return (
                                                <ColorInput
                                                    key={`text.${key}`}
                                                    label={`text.${key}`}
                                                    // @ts-ignore
                                                    value={formik.values.text[key]}
                                                    name={`text.${key}`}
                                                    onChange={(newValue) => formik.setFieldValue(`text.${key}`, newValue)}
                                                    styles={color_input_style}
                                                />
                                            )
                                        })}
                                    </>
                                )
                            }
                            return null
                        })}
                    </Box>
                </Box>
                <Button type="submit" variant="contained">
                    criar
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
    )
}
