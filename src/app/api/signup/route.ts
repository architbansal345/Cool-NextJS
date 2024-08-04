import { connect } from "../../../dbConfig/dbconfig";
import { NextRequest , NextResponse } from "next/server";
import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import { error } from "console";

connect()

export async function POST(request:NextRequest) {
    try{
        const reqBody =  await request.json();
        const {username , email , password} = reqBody;

        console.log(reqBody)
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User Already Exist"},{status:400})
        }
        // Hash Password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            username,email,password:hashPassword
        })
        const saveUser = await newUser.save()
        console.log(saveUser);
        return NextResponse.json({
            message:"User Created Successfully",
            success:true,
            saveUser
        })
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}