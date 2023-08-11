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
    const { connectedList } = useUser()
    const connected = connectedList.find((item) => item.id == user.id)

    const dotSize = small ? "1vw" : "2vw"

    return (
        <Badge
            badgeContent={connected ? "" : 0}
            color={"success"}
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
