import z from "zod"

export interface CreatePostInputDTO{
    content: string,
    token:string
}

export type CreatePostOutputDTO= undefined

export const CreatePostScherma= z.object({
    content: z.string().min(5),
    token:z.string().min(1)
}).transform(data=>data as CreatePostInputDTO)