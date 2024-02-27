

import  Jwt  from "jsonwebtoken"
import User from "../models/usermodel.js"
const isAutherized = async (req, res, next)=>{
try{
    const {token} = req.cookies

    if(!token){
        return res.status(400).send({message:"user is not authorized"})
    }
    const decode =  await Jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log("decode token", decode)

    req.user = await User.findById(decode.id)
    next()
}catch(error){
    if (error.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expired. Please log in again." });
      } else {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
      }
}
}

export default isAutherized