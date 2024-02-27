import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routers/userRouter.js"
import applicationRouter from "./routers/aplicationRouter.js"
import jobrouter from "./routers/jobRouter.js"
import fileUpload from "express-fileupload"
import cors from "cors"
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.get("/", (req, res)=>{
    res.send("congratulation your app is working perfectly")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/application", applicationRouter)
app.use("/api/v1/job", jobrouter)


export default app