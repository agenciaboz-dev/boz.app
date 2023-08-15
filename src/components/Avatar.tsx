import React, { useEffect, useState } from "react"
import { Badge, Avatar as MuiAvatar, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { useImageUrl } from "../hooks/useImageUrl"
import { usePictureModal } from "../hooks/usePictureModal"

interface AvatarProps {
    user: User
    sx?: SxProps
    small?: boolean
    size: string | number
    noClickModal?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({ user, sx, size, small, noClickModal }) => {
    const { getProfilePic } = useImageUrl()
    const { connectedList, list } = useUser()
    const picture = usePictureModal()
    const connected = connectedList.find((item) => item.id == user.id)

    const [url, setUrl] = useState(getProfilePic(user))

    const dotSize = small ? "1vw" : "2vw"

    useEffect(() => {
        setUrl((url) => `${url}?timestamp=${new Date().getTime()}`)
    }, [list])

    return (
        <Badge
            badgeContent={connected ? "" : 0}
            color={"success"}
            sx={{ width: size, height: size }}
            overlap="circular"
            componentsProps={{ badge: { style: { minWidth: 0, width: dotSize, height: dotSize, borderRadius: "50%" } } }}
        >
            <MuiAvatar
                src={url}
                sx={{
                    color: "primary.main",
                    backgroundColor: "background.default",
                    width: size,
                    height: size,
                    cursor: "pointer",
                    ...sx,
                }}
                onClick={() => (noClickModal ? {} : picture.open(url))}
            />
        </Badge>
    )
}
