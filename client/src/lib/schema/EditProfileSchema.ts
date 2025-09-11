import * as z from "zod"; 
export const editProfileSchema =z.object({ 
    displayName:z.string(),
    bio: z.string().optional()

});
export type EditProfileSchema = z.infer<typeof editProfileSchema>;