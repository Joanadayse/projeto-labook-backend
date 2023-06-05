import z from "zod"

export interface likeOrDislikePostInputDTO{
    postId: string,
    token:string,
    like: boolean
    
}
export type likeOrDislikePostOutputDTO= undefined

export const likeOrDislikePostScherma= z.object({
    postId: z.string().min(1),
    token:z.string().min(1),
    like: z.boolean()
}).transform(data => data as likeOrDislikePostInputDTO)