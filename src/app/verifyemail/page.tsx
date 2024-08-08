'use client'

import axios from "axios"
import Link from "next/link"
import React,{useState, useEffect} from "react"

export default function VerifyEmail(){
    const [token,settoken] = useState("");
    const [verify,setverify] = useState(false);
    const verifyuser = async() => {
        try {
            await axios.post('/api/verifyEmail',{token});
            setverify(true);
        } catch (error:any) {
            console.log(error.message);
            setverify(false);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        settoken(urlToken || "")
    },[])
    useEffect(()=>{
        if(token.length > 0){
            verifyuser()   
        }
    },[token])
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-2xl">Verify Email</h1>
                <h2>{verify ? `${token}`:"Not Verified"}</h2>

            </div>
        </>
    )
}