'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignUp() {
    const router = useRouter()
    const [user,setUser] = React.useState({
        username:"",
        email:"",
        password:"",
    })
    const [button , setButton] = React.useState(true);
    const onSignUp = async() => {
        try{
            const response = await axios.post("/api/signup",user);
            console.log("Successful SignUp", response.data)
            router.push("/login")
        }
        catch(error:any){
            console.log("signUp failed",error)
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setButton(false);
        }else{
            setButton(true)
        }
    },[user])
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen p-2 border border-1">
                <h1>Sign Up</h1>
                <hr/>
                <label htmlFor="username">Username</label>
                <input className="border border-1 p-1" type="text" id="username" value={user.username} placeholder="Enter Username" onChange={(e)=>setUser({...user, username:e.target.value})}></input>
                <br/>
                <label htmlFor="email">Email</label>
                <input className="border border-1 p-1" type="text" id="email" value={user.email} placeholder="Enter Email" onChange={(e)=>setUser({...user, email:e.target.value})}></input>
                <br/>
                <label htmlFor="password">Password</label>
                <input className="border border-1 p-1" type="password" id="password" value={user.password} placeholder="Enter Password" onChange={(e)=>setUser({...user, password:e.target.value})}></input>
                <br/>
                <button onClick={onSignUp} className="border border-blue-400 p-2 rounded text-blue-900">{button?"Not Sign Up":"signup"}</button>
                <Link href="/login">Visit Login Page</Link>
            </div>
        </>
    )
}