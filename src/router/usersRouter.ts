import express from "express"
import { UsersController } from "../controller/UsersController";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersDataBase } from "../database/UsersDataBase";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { HashManager } from "../services/HashManager";

export const userRouter= express.Router();

const userController= new UsersController(new UsersBusiness(
    new UsersDataBase(),
    new TokenManager(),
    new IdGenerator(),
    new HashManager()
    
    ));


userRouter.get("/", userController.getUsers)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
