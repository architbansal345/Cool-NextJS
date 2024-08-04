import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide a Username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please Provide a Email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please Provide a Password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verifiedToken:String,
    VerifiedExpiry:Date,
    forgotPassword:String,
    forgotPasswordExpiry:Date,
})

const User = mongoose.models.user || mongoose.model("user",userSchema);
export default User