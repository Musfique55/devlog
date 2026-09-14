
import { authClient } from "./authClient"

export const sendEmailVerificationLink = async(email : string) => {
    
    await authClient.sendVerificationEmail({
        email,
        callbackURL : "/dashboard"
    })
}