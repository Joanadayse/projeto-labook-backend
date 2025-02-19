import { type } from "os";
import { z } from "zod";
import { PostModel } from "../../models/Post";



export interface GetPostsInputDTO{
   token:string
}

export type GetPostsOutputDTO= PostModel[]


export const GetPostsScherma= z.object({
token: z.string().min(1)
}).transform(data=>data as GetPostsInputDTO)

