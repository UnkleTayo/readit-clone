import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import morgan from 'morgan'
import { User } from "./entities/User";
import authRoutes from './routes/auth'

import trim from "./middlewares/trim";
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)


app.get("/", (_, res,) => res.send("Hello World"))
app.use("/api/v1/auth", authRoutes)

app.listen(3000, async () => {
    console.log("Server icds running")
    try {
        await createConnection()
    } catch (err) {
        console.log(err)
    }
})
