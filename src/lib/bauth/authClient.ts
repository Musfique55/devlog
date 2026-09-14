import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL : "https://devlog-backend-a8sc.onrender.com"
})