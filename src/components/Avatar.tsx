import React, { useEffect, useState } from "react"
import { AlertColor, Badge, Avatar as MuiAvatar, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { useImageUrl } from "../hooks/useImageUrl"
import { usePictureModal } from "../hooks/usePictureModal"
import { useMediaQuery } from "@mui/material"

interface AvatarProps {
    user: User
    sx?: SxProps
    small?: boolean
    size: string | number
    noClickModal?: boolean
}

type ColorStatus = 1 | 2 | 3

export const Avatar: React.FC<AvatarProps> = ({ user, sx, size, small, noClickModal }) => {
    const isMobile = useMediaQuery({ orientation: "portrait" })
    const { getProfilePic } = useImageUrl()
    const { connectedList, list } = useUser()
    const picture = usePictureModal()
    const connected = connectedList.find((item) => item.id == user.id)

    const [url, setUrl] = useState(getProfilePic(user))

    const dotSize = small ? "1vw" : "2vw"

    const color = {
        [1]: "success" as AlertColor,
        [2]: "error" as AlertColor,
        [3]: "warning" as AlertColor,
    }

    useEffect(() => {
        setUrl((url) => `${url}?timestamp=${new Date().getTime()}`)
    }, [user])

    return (
        <Badge
            badgeContent={connected ? "" : 0}
            color={color[connected?.status as ColorStatus]}
            sx={{ width: size, height: size }}
            overlap="circular"
            componentsProps={{
                badge: {
                    style: { minWidth: 0, minHeight: 0, width: isMobile ? "4vw" : dotSize, height: isMobile ? "4vw" : dotSize, borderRadius: "50%" },
                },
            }}
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
                imgProps={{ sx: { objectFit: "contain" } }}
                onClick={() => (noClickModal ? {} : picture.open(url))}
            />
        </Badge>
    )
}
