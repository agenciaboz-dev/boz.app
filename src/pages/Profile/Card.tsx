import React from "react"
import { Box, Paper, Skeleton, alpha, lighten } from "@mui/material"
import { Avatar } from "../../components/Avatar"
import { Tag } from "../../components/Tag"
import { Avatar as AvatarUpload } from "@files-ui/react"
import { useColors } from "../../hooks/useColors"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useImageUrl } from "../../hooks/useImageUrl"

interface CardProps {
    user?: User
    name?: string
    username?: string
    roles?: Role[]
    image?: File
    setImage?: (file: File) => void
    editing?: boolean
}

export const Card: React.FC<CardProps> = ({ name, username, roles, user, image, setImage, editing }) => {
    const colors = useColors()
    const { getProfilePic } = useImageUrl()
    const { darkMode } = useDarkMode()

    const skeletonColor = darkMode ? "" : lighten(colors.primary, 0.15)

    return (
        <Paper
            elevation={3}
            sx={{
                width: "25%",
                padding: "8vw 3vw",
                flexDirection: "column",
                alignItems: "center",
                gap: "2vw",
                borderRadius: "0.2vw 0 0 2vw ",
                bgcolor: "background.paper",
                color: "secondary.main",
            }}
        >
            {editing ? (
                setImage && (
                    <AvatarUpload
                        src={image || (user && getProfilePic(user))}
                        onChange={(file) => setImage(file)}
                        smartImgFit={"orientation"}
                        changeLabel="trocar a imagem"
                        emptyLabel="enviar imagem"
                        // style={{ width: "100%", height: "30vw" }}
                        style={{
                            width: "12vw",
                            height: "12vw",
                            borderRadius: "20vw",
                            fontSize: "1.0vw",
                        }}
                    />
                )
            ) : !user ? (
                <Skeleton variant="circular" animation="wave" sx={{ width: "12vw", height: "12vw", bgcolor: skeletonColor }} />
            ) : (
                <Avatar size={"12vw"} user={user} />
            )}
            <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                {!name ? (
                    <Skeleton variant="rounded" animation="wave" sx={{ width: "15vw", height: "2vw", bgcolor: skeletonColor }} />
                ) : (
                    <p style={{ fontWeight: "600", fontSize: "1.3vw", color: "secondary.main" }}>{name}</p>
                )}
                {!username ? (
                    <Skeleton variant="rounded" animation="wave" sx={{ width: "10vw", height: "2vw", bgcolor: skeletonColor }} />
                ) : (
                    <p style={{ fontSize: "1.0vw", color: "secondary.main" }}>@{username}</p>
                )}
            </Box>
            <Box sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}>
                {roles && roles.map((role) => <Tag key={role.id} name={role.tag} sx={{ fontSize: "0.7vw" }} />)}
            </Box>
        </Paper>
    )
}
