import { getDatafromToken } from "../../../helpers/getDatafromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../models/userModel";

import { connect } from "../../../dbConfig/dbconfig";
connect();
export async function GET(request:NextRequest) {
    try{
        const UserId = await getDatafromToken(request);
        const user = await User.findOne({id:UserId}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:user
        })  
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})
    }
}
