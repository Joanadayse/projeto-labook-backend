import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { signupSchema } from "../dtos/users/signup.dto";
import { loginSchema } from "../dtos/users/login.dto";
import { GetUsersSchema } from "../dtos/users/getUsers.dto";

export class UsersController{
    constructor(
        public usersBusiness : UsersBusiness
    ){}

    public getUsers = async (req: Request, res: Response) => {
      try {
        const input = GetUsersSchema.parse({
          q: req.query.q,
          token: req.headers.authorization 
        })
  
        const output = await this.usersBusiness.getUsers(input)
  
        res.status(200).send(output)
      } catch (error) {
        console.log(error)
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado")
        }
      }
    }


    public signup= async( req: Request, res: Response)=>{
        try{
            const input= signupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            

            const output= await this.usersBusiness.signup(input)
            res.status(201).send(output)
        }catch (error) {
            console.log(error)
      
            if(error instanceof ZodError){
              res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else {
              res.status(500).send("Erro inesperado")
            }
          }
    }

    public login= async (req:Request, res:Response)=>{
      try{
            const input= loginSchema.parse({
              email: req.body.email,
              password: req.body.password
            })

            const output= await this.usersBusiness.login(input)
            res.status(200).send(output)
      }catch(error){
        console.log(error)

        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado")
        }
      }
      }
    }



