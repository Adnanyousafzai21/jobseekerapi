import app from "./app.js";
import connectDB from "./db/databas.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})



connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server is listning on port ${process.env.PORT}`)
})