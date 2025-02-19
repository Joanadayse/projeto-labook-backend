import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDataBase } from "../database/PostDataBase";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter= express.Router()

const postController= new PostController(
    new PostBusiness(
        new PostDataBase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id",postController.deletePost);

postRouter.put("/:id/like",postController.likeOrDislikePost);