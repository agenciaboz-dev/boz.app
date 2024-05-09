import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Grid, IconButton, MenuItem, Paper } from "@mui/material"
import { Subroute } from "./Subroute"
import { useFormik } from "formik"
import { OvenForm, WhatsappForm, WhatsappTemplateComponent } from "../../../types/server/Meta/WhatsappBusiness/WhatsappForm"
import { TaiTextField } from "../../../components/TaiTextField"
import { Delete, DeleteForever, PlusOne } from "@mui/icons-material"
import { api } from "../../../api"
import { TemplateComponent, TemplateInfo } from "../../../types/server/Meta/WhatsappBusiness/TemplatesInfo"
import { Avatar, FileInputButton } from "@files-ui/react"

interface MessageFormProps {}

const ComponentType: React.FC<{ component: TemplateComponent }> = ({ component }) => {
    return <Box sx={{ color: "secondary.main", fontWeight: "bold" }}>{component.type}</Box>
}

export const MessageFormScreen: React.FC<MessageFormProps> = ({}) => {
    const [templates, setTemplates] = useState<TemplateInfo[]>([])
    const [image, setImage] = useState<File>()
    const [loading, setLoading] = useState(false)

    const fetchTemplates = async () => {
        try {
            const response = await api.get("/whatsapp/templates")
            setTemplates(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik<OvenForm>({
        initialValues: { to: [], template: null },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            console.log(values)
            const formData = new FormData()
            if (image) formData.append("file", image)
            formData.append("data", JSON.stringify(values))

            setLoading(true)
            try {
                const response = await api.post("/whatsapp/oven", formData)
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
    })

    const onNewMessage = () => {
        const to = [...formik.values.to]
        to.push("")
        formik.setFieldValue("to", to)
    }

    const onDeleteMessage = (index: number) => {
        const to = formik.values.to.filter((_, item_index) => item_index != index)
        formik.setFieldValue("to", to)
    }

    const handleImageChange = (file: File) => {
        setImage(file)
    }

    useEffect(() => {
        fetchTemplates()
    }, [])

    return (
        <Subroute title="Enviar mensagem">
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <Paper sx={{ padding: "1vw" }}>
                        <Grid container columns={2} spacing={2}>
                            <Grid item xs={2}>
                                <TaiTextField
                                    label="Template"
                                    value={formik.values.template?.name || ""}
                                    onChange={(event) =>
                                        formik.setFieldValue("template", templates.find((item) => item.name == event.target.value) || null)
                                    }
                                    select
                                >
                                    <MenuItem value={""} sx={{ display: "none" }} />
                                    {templates.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TaiTextField>
                            </Grid>
                            {formik.values.template?.components.map((component, index) => {
                                if (component.format == "IMAGE") {
                                    return (
                                        <Grid item xs={1}>
                                            <ComponentType component={component} />
                                            <Box sx={{ alignItems: "center", flexDirection: "column" }}>
                                                <Avatar
                                                    style={{ width: "100%", height: "auto", aspectRatio: "2/1", objectFit: "contain" }}
                                                    emptyLabel="Enviar imagem"
                                                    changeLabel="Trocar imagem"
                                                    src={image}
                                                    onChange={(file) => handleImageChange(file)}
                                                />
                                            </Box>
                                        </Grid>
                                    )
                                }

                                if (component.text) {
                                    return (
                                        <Grid item xs={1}>
                                            <ComponentType component={component} />
                                            <Box>{component.text}</Box>
                                        </Grid>
                                    )
                                }

                                if (component.buttons) {
                                    return (
                                        <Grid item xs={1}>
                                            <ComponentType component={component} />
                                            <Grid container columns={2} spacing={2}>
                                                {component.buttons.map((button) => (
                                                    <Grid item xs={1} key={button.text}>
                                                        <Button variant="outlined" fullWidth sx={{ textTransform: "none" }}>
                                                            {button.text}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    )
                                }

                                return null
                            })}
                        </Grid>
                    </Paper>

                    <Paper sx={{ padding: "1vw", alignItems: "center" }}>
                        <Grid container columns={3} spacing={2}>
                            {formik.values.to.map((number, index) => (
                                <Grid item xs={1} key={index}>
                                    <TaiTextField
                                        label="Número"
                                        name={`to[${index}]`}
                                        value={number}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <IconButton color="secondary" onClick={() => onDeleteMessage(index)}>
                                                    <DeleteForever />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={1}>
                                <Button variant="outlined" sx={{ borderStyle: "dashed", height: "100%" }} onClick={onNewMessage} fullWidth>
                                    <PlusOne />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                <Button type="submit" variant="contained" disabled={!formik.values.to.length || !formik.values.template}>
                    {loading ? <CircularProgress size="1.5rem" color="inherit" /> : "enviar"}
                </Button>
            </form>
        </Subroute>
    )
}
