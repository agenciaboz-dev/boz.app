import React from "react"
import { Badge, Avatar as MuiAvatar, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { useImageUrl } from "../hooks/useImageUrl"

interface AvatarProps {
    user: User
    sx?: SxProps
    small?: boolean
    size: string | number
}

export const Avatar: React.FC<AvatarProps> = ({ user, sx, size, small }) => {
    const { getProfilePic } = useImageUrl()
    const { connected } = useUser()

    const dotSize = small ? "1vw" : "2vw"

    return (
        <Badge
            badgeContent={""}
            color={connected ? "success" : "error"}
            sx={{ width: size, height: size }}
            overlap="circular"
            componentsProps={{ badge: { style: { minWidth: 0, width: dotSize, height: dotSize, borderRadius: "50%" } } }}
        >
            <MuiAvatar
                src={getProfilePic(user)}
                sx={{
                    color: "primary.main",
                    backgroundColor: "background.default",
                    width: size,
                    height: size,
                    ...sx,
                }}
            />
        </Badge>
    )
}
