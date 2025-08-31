import * as z from "zod";

export const formSchema = z.object({
  title: z.string({message:"Title is required"}).min(2, { message: "title is too short." }),
  description: z.string({message:"Title is required"}).min(5, { message: "description is too short." }),
  category: z.string({ message: "Category is required." }),
  date: z.coerce.date({ message: "Invalid date.. please fix!"}),
  location: z.object({
    venue:  z.string(),
    city:z.string().optional(),
    latitude:z.coerce.number(),
    longitude:z.coerce.number()
  }),
  
});

export type FormSchemaType = z.infer<typeof formSchema>;


