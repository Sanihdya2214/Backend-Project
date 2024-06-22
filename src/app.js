import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express()


app .use(cors({
   
  origin:process.env.CORS_ORIGIN,
  credentials:true


}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Router Import
import userRouter from "./routes/user.routes.js"


//Routes Declaration
app.use("/api/v1/users",userRouter)  //This will pass on to userRouter code 





export {app}