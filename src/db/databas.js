import mongoose from "mongoose";

const connectDB = async ()=>{
const dbname= "joobseeker"
 const connectioninstance=   await mongoose.connect(process.env.mongoDB_URL)

 console.log(`mongdb connection !! DB host ${connectioninstance.connection.host}`)

}
export default connectDB