import React from "react"
import { Box, Paper, Skeleton, Tooltip, alpha, lighten } from "@mui/material"
import { Avatar } from "../../components/Avatar"
import { Tag } from "../../components/Tag"
import { Avatar as AvatarUpload } from "@files-ui/react"
import { useColors } from "../../hooks/useColors"
import { useDarkMode } from "../../hooks/useDarkMode"
import { useImageUrl } from "../../hooks/useImageUrl"
import InstagramIcon from "@mui/icons-material/Instagram"
import GitHubIcon from "@mui/icons-material/GitHub"
interface CardProps {
    user?: User
    name?: string
    username?: string
    roles?: Role[]
    image?: File
    setImage?: (file: File) => void
    editing?: boolean
    phone?: string
    email?: string
    dev?: boolean
}

export const Card: React.FC<CardProps> = ({ name, username, phone, email, roles, user, image, setImage, editing, dev }) => {
    const colors = useColors()
    const { getProfilePic } = useImageUrl()
    const { darkMode } = useDarkMode()

    const skeletonColor = darkMode ? "" : lighten(colors.primary, 0.15)

    const handleGithubClick = () => {
        const link = `https://github.com/${username}`
        window.open(link, "_blank")
    }
    const handleInstagramClick = () => {
        const link = `https://www.instagram.com/${username}/`
        window.open(link, "_blank")
    }
    return (
        <Paper
            elevation={3}
            sx={{
                width: "25%",
                padding: "7vw 3vw",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5vw",
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
                <Skeleton
                    variant="circular"
                    animation="wave"
                    sx={{ width: "12vw", height: "12vw", bgcolor: skeletonColor }}
                />
            ) : (
                <Avatar size={"12vw"} user={user} />
            )}
            <Box sx={{ flexDirection: "column", alignItems: "center", gap: "0.6vw" }}>
                {!name ? (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ width: "15vw", height: "2vw", bgcolor: skeletonColor }}
                    />
                ) : (
                    <p style={{ fontWeight: "600", fontSize: "1.3vw", color: "secondary.main" }}>{name}</p>
                )}
                {!username ? (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ width: "10vw", height: "1vw", bgcolor: skeletonColor }}
                    />
                ) : (
                    <p style={{ fontSize: "1.0vw", color: "secondary.main" }}>@{username}</p>
                )}
            </Box>
            <Box sx={{ flexDirection: "row", alignItems: "center", gap: "0.6vw", whiteSpace: "pre-wrap" }}>
                {roles &&
                    roles.map((role) => (
                        <Tag key={role.id} name={role.tag} tooltip={role.name} sx={{ fontSize: "0.7vw" }} />
                    ))}
            </Box>

            {!editing && (
                <Box sx={{ gap: "0.9vw", paddingTop: "4vw" }}>
                    <Tooltip title={username}>
                        <InstagramIcon color="secondary" onClick={handleInstagramClick} />
                    </Tooltip>
                    {dev && (
                        <Tooltip title={username}>
                            <GitHubIcon color="secondary" onClick={handleGithubClick} />
                        </Tooltip>
                    )}
                </Box>
            )}
        </Paper>
    )
}
