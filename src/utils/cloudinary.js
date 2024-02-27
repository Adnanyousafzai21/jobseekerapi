
import fs from "fs"


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: "dhpyyn3tq",
//    process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: "725217132995781",
//    process.env.CLOUDINARY_API_KEY, 
  api_secret: "6Ppsn0xIc6CmtGRjMz7SBchMbrQ"
//    process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        console.log("this the path of file which is sent to cloudinary", localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}