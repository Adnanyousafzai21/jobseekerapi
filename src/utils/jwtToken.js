export const sendToken = async (user, res, message , statusCode)=>{
    const token = await user.getJwtToken();
    const options= {
        expiresIn :new Date(Date.now()+process.env.COOKIES_EXPIRES*24*60*60*1000),
        // httpOnly: true
    }
    res.status(statusCode).cookie("token",token, options).json({success:true, message, user, token})
}