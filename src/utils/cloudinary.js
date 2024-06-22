import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View Credentials' below to copy your API secret
    })
})

const UplaadCloudinary= async (localFilePath)=>{
    try {
        if(!localFilePath) return null
       
        const Response= await  cloudinary.uploader.upload(localFilePath,{
                resource_type:auto,
            })
            console.log("The file has been suuccessfully uploaded",Response.url)
            return  Response
    } catch (error) {
         fs.unlinkSync(localFilePath) //remove the temporary saved local file  as the upload 
           //operation got failed
           return null  
    }
   
}




export {UplaadCloudinary}