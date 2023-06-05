import { ZodError } from "zod";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { CreatePostScherma } from "../dtos/posts/createPost.dto";
import { Request, Response } from "express";
import { GetPostsScherma } from "../dtos/posts/getPost.dto";
import { EditPostScherma } from "../dtos/posts/editPost.dto";
import { DeletePostScherma } from "../dtos/posts/deletePost.dto";
import { likeOrDislikePostScherma } from "../dtos/posts/likeOrDislikePost.dto";

export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}

    public createPost = async (req: Request , res: Response)=>{
        try{
          const input= CreatePostScherma.parse({
            content: req.body.content,
            token: req.headers.authorization
          })

          const output= await this.postBusiness.createPost(input)
          res.status(201).send(output)

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

    public getPost= async( req:Request, res: Response)=>{
      try{
        const input= GetPostsScherma.parse({
          token: req.headers.authorization
        })

        const output = await this.postBusiness.getPost(input)
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

    public editPost= async( req:Request, res: Response)=>{
      try{
        const input= EditPostScherma.parse({
          content: req.body.content,
          token: req.headers.authorization,
          idToEdit:req.params.id

        })

        const output = await this.postBusiness.editPost(input)
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
    public deletePost= async( req:Request, res: Response)=>{
      try{
        const input= DeletePostScherma.parse({
          token: req.headers.authorization,
          idToDelete:req.params.id

        })

        const output = await this.postBusiness.deletePost(input)
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
    public likeOrDislikePost= async( req:Request, res: Response)=>{
      try{
        const input= likeOrDislikePostScherma.parse({
          postId:req.params.id,
          token: req.headers.authorization,
          like:req.body.like

        })

        const output = await this.postBusiness.likeOrDislikePost(input)
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