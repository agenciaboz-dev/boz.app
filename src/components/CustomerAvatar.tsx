import React, { useEffect, useState } from "react"
import { Avatar, Box, SxProps } from "@mui/material"
import { useImageUrl } from "../hooks/useImageUrl"
import { useCustomers } from "../hooks/useCustomers"
import { usePictureModal } from "../hooks/usePictureModal"

interface CustomerAvatarProps {
    customer: Customer
    sx?: SxProps
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({ customer, sx }) => {
    const { getCustomerPic } = useImageUrl()
    const { open } = usePictureModal()

    // const [url, setUrl] = useState(getCustomerPic(customer))

    // useEffect(() => {
    //     setUrl((url) => `${url}?timestamp=${new Date().getTime()}`)
    // }, [customer])

    return (
        <Avatar
            src={customer.image}
            imgProps={{ sx: { objectFit: "contain", cursor: "pointer" } }}
            sx={sx}
            variant="rounded"
            onClick={() => open(customer.image)}
        />
    )
}
