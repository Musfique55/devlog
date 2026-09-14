import z from "zod";

const createLog = z.object({
    todayWork : z.string().min(10,"minimum 10 characters required"),
    tomorrowWork : z.string().min(10,"minimum 10 characters required"),
    blocker : z.string().optional(),
    projectTag : z.string().optional(),
})


export const logValidator = {
    createLog

}