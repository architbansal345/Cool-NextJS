import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getDatafromToken(request:NextRequest){
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodeToken:any = jwt.verify(token,process.env.TOKEN_SECRET);
        return decodeToken._id
    } catch (error:any) {
        throw new Error(error.message);
    }
}