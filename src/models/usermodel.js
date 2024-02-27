

import mongoose from "mongoose"
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"

const userSchema = mongoose.Schema({
name:{
    type: String,
    require:[true, "please enter your name"]
},
email:{
    type: String,
    require:[true , "please enter your email"]
},
phone:{
    type :Number,
    required: [true , "pleas enter your number"]
},
password:{
    type:String,
    require:[true, "password is required"]
},
role:{
    type:String,
    enum:["Employer","Job Seeker"],
    require: [true, "please select your role"]
},
createdAt:{
    type: Date,
    default:Date.now
}
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getJwtToken = async function(){
    return Jwt.sign({id: this._id},
        process.env.JWT_SECRET_KEY,
    {    expiresIn : process.env.JWT_EXPIRY}
        )
}


const User = mongoose.model("User", userSchema)
export default User