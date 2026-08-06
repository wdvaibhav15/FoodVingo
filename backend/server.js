import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"


const app = express()
const port = process.env.PORT || 2000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
//middlewares
app.use(express.json())// data come from frontend convert into json format
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api/auth", authRouter)

app.use("/", (req, res) => {
    res.send("Server is running")
})




app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`)
})