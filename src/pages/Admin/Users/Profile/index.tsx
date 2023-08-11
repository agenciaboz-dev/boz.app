import React, { useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper, TextField } from "@mui/material"
import colors from "../../../../style/colors"
import { Avatar } from "../../../../components/Avatar"
import { Tag } from "../../../../components/Tag"
import { useNavigate, useParams } from "react-router-dom"
import { WildCard } from "../../../WildCard"
import { useUser } from "../../../../hooks/useUser"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useConfirmDialog } from "burgos-confirm"

interface UpdateUsersProps {
    user: User
}

export const Profile: React.FC<UpdateUsersProps> = ({ user }) => {
    const { list, remove } = useUser()
    const { confirm } = useConfirmDialog()

    const username = useParams().username
    const profile = list.find((item) => item.username == username)
    const navigate = useNavigate()

    const [deleting, setDeleting] = useState(false)

    const handleDelete = () => {
        if (deleting) return
        if (!profile) return

        confirm({
            title: "atenção",
            content: `tem certeza que deseja deletar a conta de ${profile.name}? essa ação é irreversível`,
            onConfirm: () => remove(profile, setDeleting),
        })
    }

    return profile ? (
        <Box sx={{ width: "100%", height: "80.2%", padding: "2vw 3vw" }}>
            <Paper elevation={3} sx={{ borderRadius: "0.3vw 3vw 0", backgroundColor: "background.default", width: "100%" }}>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "background.paper",
                        width: "25%",
                        padding: "8vw 3vw",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2vw",
                        borderRadius: "0.2vw 0 0 2vw ",
                        position: "relative",
                    }}
                >
                    <IconButton
                        sx={{ position: "absolute", top: "1vw", left: "1vw" }}
                        color="secondary"
                        onClick={() => navigate("/admin/users")}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <Avatar size={"12vw"} user={profile} />
                    <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                        <p style={{ fontWeight: "600", fontSize: "1.3vw", color: colors.secondary }}>{profile.name}</p>
                        <p style={{ fontSize: "1.0vw", color: colors.secondary }}>@{profile.username}</p>
                    </Box>
                    <Box sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}>
                        <Tag variant="" style="0.7vw" name="Admin"></Tag>
                        <Tag variant="" style="0.7vw" name="Planejamento"></Tag>
                        <Tag variant="" style="0.7vw" name="Dev"></Tag>
                    </Box>
                </Paper>
                <Box sx={{ width: "73%", height: "100%", padding: "2vw", gap: "2vw" }}>
                    <Box sx={{ width: "50%", height: "100%", flexDirection: "column", gap: "1vw" }}>
                        <TextField label="Login" disabled></TextField>
                        <TextField label="Nome"></TextField>
                    </Box>
                    <Box sx={{ width: "50%", height: "100%", flexDirection: "column", gap: "1vw" }}>
                        <TextField label="Login" disabled></TextField>
                        <TextField label="Nome"></TextField>
                        <Box sx={{ marginTop: "auto", alignSelf: "flex-end", gap: "1vw" }}>
                            <Button
                                variant="outlined"
                                sx={{ color: "error.main", fontWeight: "bold", minWidth: 0, padding: "0 0.5vw" }}
                                color="error"
                                onClick={handleDelete}
                            >
                                {deleting ? <CircularProgress size="1.5rem" color="error" /> : <DeleteForeverIcon />}
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: "secondary.main", fontWeight: "bold", width: "10vw" }}
                            >
                                salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    ) : (
        <WildCard />
    )
}
