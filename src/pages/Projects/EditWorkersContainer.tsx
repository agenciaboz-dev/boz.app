import React, { useState } from "react"
import { Box, Grid, IconButton, MenuItem, Paper, Tooltip } from "@mui/material"
import { WorkerContainer } from "./WorkerContainer"
import { FormikErrors } from "formik"
import useMeasure from "react-use-measure"
import { useUser } from "../../hooks/useUser"
import normalize from "../../tools/normalize"
import { Cancel } from "@mui/icons-material"
import { Avatar } from "../../components/Avatar"
import { TaiTextField } from "../../components/TaiTextField"

interface EditWorkersContainerProps {
    formik: {
        values: NewProjectForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<NewProjectForm>>
    }
    user: User
}

export const EditWorkersContainer: React.FC<EditWorkersContainerProps> = ({ formik, user }) => {
    const users = useUser()

    const [ref, { width }] = useMeasure()

    const [addingUser, setAddingUser] = useState("")
    const [showUsers, setShowUsers] = useState(false)

    const addWorker = (user: User) => {
        const worker: NewWorkerForm = {
            user_id: user.id,
            admin: false,
        }
        formik.setFieldValue("workers", [...formik.values.workers, worker])
        setShowUsers(false)
    }

    return (
        <Paper
            elevation={3}
            sx={{
                flexDirection: "column",
                width: "29%",
                gap: "1vw",
                bgcolor: "background.default",
                overflowY: "auto",
                padding: "1vw",
                borderRadius: "0 2vw 0 2vw ",
                color: "text.secondary",
            }}
        >
            <Grid container columns={1} spacing={1.5}>
                {formik.values.workers.map((worker, index) => (
                    <WorkerContainer key={worker.user_id} worker={worker} self={user.id == worker.user_id} formik={formik} index={index} />
                ))}
                <Grid item xs={1}>
                    <Tooltip
                        placement="top-start"
                        open={showUsers}
                        enterDelay={0}
                        componentsProps={{ tooltip: { sx: { bgcolor: "background.default", padding: 0 } } }}
                        title={
                            <Paper
                                sx={{
                                    flexDirection: "column",
                                    gap: "0.3vw",
                                    bgcolor: "background.default",
                                    padding: "0.5vw",
                                    color: "text.secondary",
                                    maxHeight: "40vh",
                                    overflowY: "auto",
                                    width: width,
                                }}
                            >
                                <Box
                                    sx={{
                                        justifyContent: "space-between",
                                        fontSize: "1rem",
                                        alignItems: "center",
                                        paddingLeft: "1vw",
                                        fontWeight: "bold",
                                        color: "primary.main",
                                    }}
                                >
                                    <Box>{"escolha o usuário"}</Box>
                                    <IconButton onClick={() => setShowUsers(false)}>
                                        <Cancel />
                                    </IconButton>
                                </Box>
                                {users.list
                                    .filter((item) => !formik.values.workers.find((worker) => worker.user_id == item.id))
                                    .filter((user) => normalize(user.name).includes(normalize(addingUser)))
                                    .map((user) => (
                                        <MenuItem sx={{ alignItems: "center", gap: "0.5vw" }} key={user.id} onClick={() => addWorker(user)}>
                                            <Avatar user={user} size="2vw" noClickModal small />
                                            <Box>{user.name.split(" ")[0]}</Box>
                                        </MenuItem>
                                    ))}
                            </Paper>
                        }
                    >
                        <TaiTextField
                            value={addingUser}
                            onChange={(event) => setAddingUser(event.target.value)}
                            InputProps={{ ref }}
                            onFocus={() => setShowUsers(true)}
                            label="adicionar usuário ao projeto"
                        />
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
}
