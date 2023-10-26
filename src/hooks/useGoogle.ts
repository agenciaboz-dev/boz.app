import { useContext, useState } from "react"
import GoogleContext from "../contexts/googleContext"
import { useGoogleLogin } from "@react-oauth/google"
import { useIo } from "./useIo"

export const useGoogle = () => {
    const io = useIo()
    const googleContext = useContext(GoogleContext)

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse)
            io.emit("google:exchange", tokenResponse.code)
            // googleContext.setAccessToken(tokenResponse.access_token)

            // if (tokenResponse.access_token) {
            //     io.emit("google:login", tokenResponse.access_token)
            // }
        },
    })

    return { ...googleContext, login: googleLogin }
}
