'use client'
export default function UserProfile({params}:any){
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-2">
                Hello {params.id}
            </div>
        </>
    )
}