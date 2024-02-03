import React, { useEffect, useState } from "react"
import { Box, Checkbox, FormControlLabel, Grid, IconButton, MenuItem } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { Avatar } from "../../components/Avatar"
import { Cancel, Star } from "@mui/icons-material"
import { TaiTextField } from "../../components/TaiTextField"
import { valid_roles } from "./valid_roles"
import { FormikErrors } from "formik"

interface WorkerContainerProps {
    worker: NewWorkerForm
    self?: boolean
    formik: {
        values: NewProjectForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<NewProjectForm>>
    }
    index: number
}

export const WorkerContainer: React.FC<WorkerContainerProps> = ({ worker, self, formik, index }) => {
    const user = useUser().find(worker.user_id)
    if (!user) return null

    const removeWorker = () => {
        formik.setFieldValue(
            "workers",
            formik.values.workers.filter((item) => item.user_id != user.id)
        )
    }

    return (
        <Grid item xs={1}>
            <Box sx={{ gap: "0.5vw", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                    <Avatar user={user} size={"2.5vw"} small noClickModal />
                    <Box>{user.name.split(" ")[0]}</Box>
                </Box>
                <Box sx={{ gap: "0.5vw", alignItems: "center" }}>
                    <FormControlLabel
                        label="admin"
                        control={<Checkbox checked={worker.admin} disabled={self} onChange={formik.handleChange} name={`workers[${index}].admin`} />}
                    />

                    <IconButton disabled={self} onClick={removeWorker}>
                        <Cancel />
                    </IconButton>
                </Box>
            </Box>
        </Grid>
    )
}
