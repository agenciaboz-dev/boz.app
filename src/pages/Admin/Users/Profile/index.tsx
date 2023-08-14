import React, { useState } from "react"
import { Box, Button, CircularProgress, IconButton, Paper, TextField, SxProps } from "@mui/material"
import colors from "../../../../style/colors"
import { Avatar } from "../../../../components/Avatar"
import { Tag } from "../../../../components/Tag"
import { useNavigate, useParams } from "react-router-dom"
import { WildCard } from "../../../WildCard"
import { useUser } from "../../../../hooks/useUser"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useConfirmDialog } from "burgos-confirm"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { NewButton } from "../../../../components/NewButton"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import PhoneIcon from "@mui/icons-material/Phone"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import DateRangeIcon from "@mui/icons-material/DateRange"
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import { Edit } from "../../../../components/Edit"

interface UpdateUsersProps {
    user: User
    editingMode: boolean
}

export const Profile: React.FC<UpdateUsersProps> = ({ user, editingMode }) => {
    const { list, remove } = useUser()
    const { confirm } = useConfirmDialog()
    const [value, setValue] = useState(1)
    const [isEditing, setEditingMode] = useState(editingMode)

    const username = useParams().username
    const profile = list.find((item) => item.username == username)
    const navigate = useNavigate()

    const style_icon: SxProps = {
        gap: "0.4vw",
        alignItems: "center",
    }
    const [deleting, setDeleting] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleEditing = () => {
        if (isEditing) {
            setEditingMode(false)
        } else {
            setEditingMode(true)
        }
    }

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
                    <IconButton sx={{ position: "absolute", top: "1vw", left: "1vw" }} color="secondary" onClick={() => navigate("/admin/users")}>
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <Avatar size={"12vw"} user={profile} />
                    <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                        <p style={{ fontWeight: "600", fontSize: "1.3vw", color: colors.secondary }}>{profile.name}</p>
                        <p style={{ fontSize: "1.0vw", color: colors.secondary }}>@{profile.username}</p>
                    </Box>
                    <Box sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}>
                        <Tag variant="" fontSize="0.7vw" name="Admin"></Tag>
                        <Tag variant="" fontSize="0.7vw" name="Planejamento"></Tag>
                        <Tag variant="" fontSize="0.7vw" name="Dev"></Tag>
                    </Box>
                </Paper>

                {!isEditing ? (
                    <Box sx={{ width: "75%", height: "100%", padding: "3vw", gap: "4vw", flexDirection: "column" }}>
                        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
                            <Box sx={{ width: "100%", flexDirection: "column", gap: "0.5vw" }}>
                                <p style={{ fontWeight: "bolder" }}>Informações Pessoais</p>
                                <hr style={{}} />
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                <Box sx={{ flexDirection: "column", gap: "1vw", width: "50%" }}>
                                    <Box sx={style_icon}>
                                        <TextFieldsOutlinedIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            Nome Completo:<span style={{ fontWeight: "500" }}> {profile.name}</span>
                                        </p>
                                    </Box>
                                    <Box sx={style_icon}>
                                        <FolderOpenIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            CPF:<span style={{ fontWeight: "500" }}> {profile.cpf}</span>
                                        </p>
                                    </Box>
                                    <Box sx={style_icon}>
                                        <DateRangeIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            Data de Nascimento:<span style={{ fontWeight: "500" }}> {profile.birth}</span>
                                        </p>
                                    </Box>
                                </Box>
                                <Box sx={{ flexDirection: "column", gap: "1vw", width: "50%" }}>
                                    <Box sx={style_icon}>
                                        <PhoneIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            Telefone:<span style={{ fontWeight: "500" }}> (41) 9 9275-2905</span>
                                        </p>
                                    </Box>
                                    <Box sx={style_icon}>
                                        <MailOutlineIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            E-mail:<span style={{ fontWeight: "500" }}> {profile.email}</span>
                                        </p>
                                    </Box>
                                    <Box sx={style_icon}>
                                        <PermIdentityIcon fontSize="small" />
                                        <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                            Username:<span style={{ fontWeight: "500" }}> @{profile.username}</span>
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
                            <Box sx={{ width: "100%", flexDirection: "column", gap: "0.5vw" }}>
                                <p style={{ fontWeight: "bolder" }}>Setor</p>
                                <hr />
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                <Box sx={{ ...style_icon, width: "50%" }}>
                                    <WorkOutlineOutlinedIcon fontSize="small" />
                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                        Departamento:<span style={{ fontWeight: "500" }}> Tecnologia</span>
                                    </p>
                                </Box>
                                <Box sx={{ ...style_icon, width: "50%" }}>
                                    <PermIdentityIcon fontSize="small" />
                                    <p style={{ fontWeight: "700", fontSize: "1vw", color: "gray" }}>
                                        Subáreas:
                                        <span style={{ fontWeight: "500" }}> </span>
                                    </p>
                                    <Tag name="Design" variant="" fontSize="0.7vw" />
                                    <Tag name="Programação" variant="" fontSize="0.7vw" />
                                    <Tag name="Atendimento" variant="" fontSize="0.7vw" />
                                </Box>
                            </Box>
                        </Box>
                        {/* {user.username == "luiz" && ( */}
                        <NewButton
                            onClick={handleEditing}
                            bottom={"3vw"}
                            right={"4vw"}
                            icon={<ModeEditIcon sx={{ width: "100%", height: "100%", color: colors.secondary }} />}
                        />

                        {/* <Box sx={{ width: "50%", height: "100%", flexDirection: "column", gap: "1vw" }}>
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
                    </Box> */}
                    </Box>
                ) : (
                    <Edit user={user} profile={profile} />
                )}
            </Paper>
        </Box>
    ) : (
        <WildCard />
    )
}
