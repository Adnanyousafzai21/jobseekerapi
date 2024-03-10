import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routers/userRouter.js"
import applicationRouter from "./routers/aplicationRouter.js"
import jobrouter from "./routers/jobRouter.js"
import fileUpload from "express-fileupload"
import cors from "cors"
const app = express()

const corsOptions = {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.get("/", (req, res) => {
    res.send({ message: "Congratulations, your app is working perfectly!" });
});



app.use("/api/v1/user", userRouter)
app.use("/api/v1/application", applicationRouter)
app.use("/api/v1/job", jobrouter)


export default app