"use client"
import axios from "axios"
import link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import "./profile.css";





export default function ProfilePage(){
    const router = useRouter();

    const logout = async ()=>{
        try{
             await axios.get('/api/users/logout')
                toast.success("Logout successful")
                router.push('/login')
                







        }catch(error:any){
            console.log(error.message);

            toast.error(error.message)

        }

    }
    return(
        <div className="sign">
            <h1>Welcome to My Testing Page</h1>
            <hr />
            <p>This was just to create and see how my LOGIN & SIGNUP works</p>
            <hr />
            <button  className="btn  border-t-indigo-400 min-xl: btn bg-blue-300" onClick={logout}>Logout</button>
        </div>
    )

    }