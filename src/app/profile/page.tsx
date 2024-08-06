'use client'
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data,Userdata] = useState("nothing");
    const signout = async() => {
        try {
            await axios.post('/api/logout');
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
        }
    }
    const getUserDetails = async() => {
        const res = await axios.get('/api/me');
        console.log(res.data);
        Userdata(res.data.data._id)
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center p-2 min-h-screen">
                <h1>Profile Page</h1>
                <h2>My Profile</h2>
                <h2>{data === "nothing"?"Nothing here" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <br/>
                <button className="border border-1 p-2 border-blue-400 text-red-900 mt-4 hover:bg-red-100" onClick={signout}>SignOut</button>
                <button className="border border-1 p-2 border-green-400 text-red-600 mt-4 " onClick={getUserDetails}>GetUserDetails</button>
            </div>
        </>
    )
}