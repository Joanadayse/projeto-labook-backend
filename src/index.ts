import express from 'express'
import cors from 'cors'
import { userRouter } from './router/usersRouter'
import dotenv from "dotenv"
import { postRouter } from './router/postRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT||3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use("/users", userRouter);
app.use("/posts", postRouter);
