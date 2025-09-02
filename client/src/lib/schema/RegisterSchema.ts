import * as z from "zod"; 
export const registerSchema =z.object({ 
    email:z.email(),
    displayName:z.string({message:"Title is required"}).min(1, { message: "description is too short." }),
    password: z.string().min(8),

});
export type RegisterSchemaType = z.infer<typeof registerSchema>;