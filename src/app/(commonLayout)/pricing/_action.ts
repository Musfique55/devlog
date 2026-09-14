"use server"

import { envVars } from "@/env"
import fetchWithAuthServer from "@/lib/fetchWithAuth"

export interface CheckoutResponse{
    success : boolean,
    paymentUrl? : string,
    message : string
}

export const stripeCheckoutSession = async () : Promise<CheckoutResponse> => {
    try {
        const res = await fetchWithAuthServer(`${envVars.API_URL}/payment/create-checkout-session`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            }
        });


        if(!res.ok){
            return {
                message : res.statusText,
                success : false
            }
        }

        const data = await res.json();

        return {
            success : true,
            paymentUrl : data.data.paymentUrl,
            message : data.message
        };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        console.log(error);
        return {
                message : error.message,
                success : false
            }
    }
}

export const checkPaymentStatus = async (transactionId : string)  => {
    try {
        const res = await fetch(`${envVars.API_URL}/payment/${transactionId}`);

        if(!res.ok){
            return {
                message : res.statusText,
                success : false,
                data : null
            }
        }

        const result = await res.json();

        return {
            message : result.message,
            success : true,
            data : result.data
        }
            
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return {
            message : error.message,
            success : false,
            data : null
        }
    }
}