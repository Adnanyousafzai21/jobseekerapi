import User from "../models/usermodel.js"
import {sendToken} from "../utils/jwtToken.js"
const Register = async (req, res, next) => {
    const { name, email, password, role, phone } = req.body
    if (
        !name || !email || !role || !phone || !password
    ) {
     return   res.status(400).send({message:"all field are required"})
    }
    const userExist = await User.findOne({email})
    if(userExist) return res.status(400).send({message:"the user is already exist"})

    const createdUser = await User.create({
        name,
        password,
        email,
        phone,
        role
    })

    const user = await User.findById(createdUser._id).select("-password")
    if(!user) return res.status(500).send({message:"somthing went wrong while creating user"})

    sendToken(user, res, "user registered successfuly" , 200)
}

 const Login = async (req, res, next)=>{

    const {email, password ,role}= req.body 
    if(!email || !password) return res.status(400).send({message:"please entered email and password"})

    const user = await User.findOne({email})
    if(!user) return res.status(404).send({message:"email or password is not correct"})


    const isPasswordMatched = await user.isPasswordCorrect(password)
    if(!isPasswordMatched) return res.status(400).send({message:"email or password does'nt match"})

    if(user.role!==role) return res.status(404).send({message:`user with provided email or ${role} is not found`})


    sendToken(user, res, "logedIn successfuly", 200)
    
}

const logedOut = async (req, res, next)=>{
    res.status(201).cookie("token","",{
        httpOnly: true,
        expiresIn: new Date(Date.now()),
    }).send({success: true, message:"LogedOut successfuly"})
}

const getuser =async (req, res, next)=>{
    const user= req.user
    
    if(!user) return res.status(500).send({message:"user not found"})
     res.status(200).send({success: true , user})
}


export {Register, Login, logedOut,getuser}