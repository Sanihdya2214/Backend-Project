import mongoose from "mongoose"
import { JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from "bcrypt"

const UserSchema= new mongoose.Schema({
         username:{
            type:String,
            required:true,
            unique:true,
             lowercase:true,
             trim:true,
             index:true,
         },
         email:{
            type:String,
            required:true,
            unique:true,
             lowercase:true,
             trim:true,
             
         },
          

         fullName:{
            type:String,
            required:true,
             trim:true,
             index:true,
         },
         avatar:{
         type:String,//Cloudnary Image
         required:true,

          },
          coverImage:{
            type:String,//Cloudnary Image
         required:true,

          },
          watchHistory:[{
                
            type:Schema.Types.ObjectId,
            ref:"video",


          }],
          password:{
            type:String,
            required:[true,'Password is Required']
          },


          refreshToken:{
            type:String,
          }
         
         
         


},{timestamps:true})

/*This is a custom hook made by thedeveloper*/UserSchema.pre("save",async function(next){
      if(!this.isModified("password")) return next() //This sees that if the password is modiufided or not
       //because we do not want to encrypt password everytme we hit save 

        this.password=bcrypt.hash(this.password,10/*rounds*/) //this function basically encrpt the password
        //using the bycrypt function 
        next()
})

UserSchema.methods.isPasswordCorrect=async function(password){
     return await bcrypt.compare(/*This is the password send by the user which is in string format and not encrypted*/password,this.password/*This is the Encrypted password */ )
     //This function basically comapares the normal string password and enxrypted password .
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",UserSchema)