import dotenv from "dotenv";
import connectDb from "./db/index.js";

import { app
    
 } from "./app.js";
dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
          console.log(`Server Is Running At Port: ${process.env.PORT || 8000}`)

    })
}
)
.catch((error)=>{
    console.log("Database failed to Connect !!!",error)
})