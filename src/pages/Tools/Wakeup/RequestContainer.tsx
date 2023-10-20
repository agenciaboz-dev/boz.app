import React, { useEffect, useState } from "react"
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { api } from "../../../api"

interface RequestContainerProps {
    request: WakeupRequest
}

export const RequestContainer: React.FC<RequestContainerProps> = ({ request }) => {
    const io = useIo()
    const formik = useFormik({ initialValues: request!, onSubmit: (values) => console.log(values) })

    const [firstRender, setFirstRender] = useState(true)

    const handleSend = () => {
        console.log(formik.values.payload)
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            if (formik.values) {
                io.emit("wakeup:request:update", {
                    id: request.id,
                    name: formik.values.name,
                    url: formik.values.url,
                    payload: formik.values.payload,
                    method: formik.values.method,
                })
            }
        }
    }, [formik.values])

    return (
        <Box sx={{ flexDirection: "column", width: "63vw", gap: "1vw" }}>
            <Grid container spacing={1.5}>
                <Grid item xs={3}>
                    <TextField label="method" name="method" value={formik.values.method} onChange={formik.handleChange} select>
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={9}>
                    <TextField label="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Grid>
            </Grid>
            <TextField label="url" name="url" value={formik.values.url} onChange={formik.handleChange} />
            <TextField
                label="payload"
                name="payload"
                value={formik.values.payload}
                onChange={formik.handleChange}
                multiline
                minRows={7}
                disabled={formik.values.method == "GET"}
            />

            <Button variant="contained" onClick={handleSend}>
                send
            </Button>

            <TextField
                label="response"
                name="response"
                value={formik.values.response}
                onChange={formik.handleChange}
                multiline
                minRows={7}
                InputProps={{ readOnly: true }}
            />

            <Button variant="contained" disabled>
                Status
            </Button>
        </Box>
    )
}
