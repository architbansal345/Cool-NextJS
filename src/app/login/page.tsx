'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [user,getUser] = useState({
        email:"",
        password:""
    })
    const [button, setbutton] = useState(true)
    const onLogin  = async() => {
        try{
            const response = await axios.post("/api/login",user)
            console.log("successful login",response.data)
            router.push("/profile")
        }
        catch(error:any){
            console.log("login Failed",error.message)
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setbutton(false)
        }else{
            setbutton(true)
        }
    },[user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Login Form</h1>
            <h1/>
                <label htmlFor="login">Email</label>
                <input className="border border-1 p-1" type="text" id="email" value={user.email} placeholder="Email" onChange={(e) => getUser({...user , email:e.target.value})}/>
            <br/>
                <label htmlFor="password">Password</label>
                <input className="border border-1 p-1" type="password" id="password" value={user.password} placeholder="Password" onChange={(e) => getUser({...user , password:e.target.value})}/>
            <br/>
            <button onClick={onLogin} className="border border-blue-400 p-2 rounded text-blue-900">{button?"Not login":"Login"}</button>
            <Link href="/signup">Visit SignUp Page</Link>
        </div>
    )
}