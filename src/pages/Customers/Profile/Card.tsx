import React from "react"
import { Box, Skeleton, Avatar, lighten, useMediaQuery } from "@mui/material"
import { useColors } from "../../../hooks/useColors"
import { useImageUrl } from "../../../hooks/useImageUrl"
import { useDarkMode } from "../../../hooks/useDarkMode"
import { Avatar as AvatarUpload } from "@files-ui/react"
import { CustomerAvatar } from "../../../components/CustomerAvatar"

interface CardProps {
    customer?: Customer
    image?: File
    setImage?: (file: File) => void
    editing?: boolean
}

export const Card: React.FC<CardProps> = ({ customer, image, setImage, editing }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')
    const colors = useColors()
    const { getCustomerPic } = useImageUrl()
    const { darkMode } = useDarkMode()

    const skeletonColor = darkMode ? "" : lighten(colors.primary, 0.15)

    return (
        <Box>
            {editing
                ? setImage && (
                      <AvatarUpload
                          src={image || (customer && getCustomerPic(customer))}
                          onChange={(file) => setImage(file)}
                          smartImgFit={"orientation"}
                          changeLabel="trocar a imagem"
                          emptyLabel="Enviar Imagem"
                          // style={{ width: "100%", height: "30vw" }}
                          style={{
                              width: "25vw",
                              height: "25vw",
                              borderRadius: "0.3vw",
                              fontSize: isMobile? "5vw" : "1.2vw",
                          }}
                      />
                  )
                : customer && (
                      <CustomerAvatar customer={customer} sx={{ width: "25vw", height: "25vw", fontSize: isMobile? "5vw" : "1.0vw" }} />
                  )}
        </Box>
    )
}
