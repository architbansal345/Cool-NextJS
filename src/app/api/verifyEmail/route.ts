import { connect } from "../../../dbConfig/dbconfig";
import User from "../../../models/userModel";
import { NextRequest , NextResponse } from "next/server";
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token);
        const user = await User.findOne({verifiedToken:token , VerifiedExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({error:"Invalid"},{status:400});
        }
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.VerifiedExpiry = undefined;
        return NextResponse.json({
            message:"Email Verified Successfully",
            status:200
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}