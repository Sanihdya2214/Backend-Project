import mongoose from 'mongoose'
import { JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from "bcrypt"

const VideoSchema=new mongoose.Schema({

  videoFile:{
    type:String, //Cloudinary images and videos
    required:true,
  },

  thumbnail:{
          type:String,
          required:true,
  },
  title:{
    type:String,
    required:true,

  },

  description:{
    type:String,
    required:true,
  },

    duration:{
      type:Number,
    required:true,
    },

    views:{
       type:Number,
       default:0,
    },

    isPublished:{
      type:Boolean,
      default:true,
    },

    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },



},{})



export const Video= mongoose.model("Video",VideoSchema)