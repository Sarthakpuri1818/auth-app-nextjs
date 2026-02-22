import mongoose from "mongoose"; //talking to database

const userschema = new mongoose.Schema({
//model for user for database and sign up page 
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default: false
    },

    isadmin:{
        type:Boolean,
        default: false
    },
    forgotpasswordtoken: String,
    forgotpasswordtokenexpiry: Date,
    verifytoken: String,  //for email to be verified from api
    verifytokenexpiry: Date,



    })
    












const User = mongoose.models.users || mongoose.model("users", userschema)


export default User;
