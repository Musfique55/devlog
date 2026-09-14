"use server"

import { envVars } from "@/env"
import fetchWithAuthServer from "@/lib/fetchWithAuth"



export const getMyInfo = async () => {
    try {
        const res = await fetchWithAuthServer(`${envVars.API_URL}/dashboard/me`)
        if(!res.ok) {
            return {
                success : false,
                message : res.statusText,
                data : null
            }
        }

        const result = await res.json()

        if(!result.success) {
            return {
                success : false,
                message : result.message,
                data : null
            }
        }

        return {
            success : true,
            data : result.data,
            message : result.message
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return {
            success : false,
            message : error.message,
            data : null
        }
    }
}

