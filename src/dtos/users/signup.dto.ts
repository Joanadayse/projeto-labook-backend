import { z } from "zod";

export interface signupInputDTO{
    name: string,
    email: string,
    password: string
}

export interface signupOuntputDTO{
   token: string
}

export const signupSchema = z.object({
    name: z.string({invalid_type_error: "name deve ser do tipo string", required_error: "'name' é obrigatório",}).min(2), 
    email:z.string({invalid_type_error: "email deve ser do tipo string", required_error: "'email' é obrigatório",}),
    password: z.string({invalid_type_error: "password deve ser do tipo string", required_error: "'password' é obrigatório",}).max(5)
}).transform(data => data as signupInputDTO)