"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage(){
    const router = useRouter();//this is to connect to different pages 
    const [user , setUser] = React.useState({
      
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    const [loading, setLoading]= React.useState(false);



    const onLogin = async ()=>{
        try{
            setLoading(true);
            const response= await axios.post("/api/users/login",user);
            console.log("login success", response.data);
            toast.success("Login successful")
            router.push("/profile");





        }catch(error:any){
            console.log("login failed completely ", error);
            toast.error(error.message);
        }finally{
            setLoading(false);

        }

    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    


    return(
        <div className="sign">
            <h1 className="text text-2xl text-black bg-center">Login</h1>

            <label htmlFor="email">Email</label>
            <input 
            type = "text" 
            id = "email"
            value = {user.email}
            onChange = {(e)=>setUser({...user, email:e.target.value})}
            placeholder="Enter your email"

/>

            <label htmlFor="password">Password</label>
            <input 
            type = "password" 
            id = "password"
            value = {user.password}
            onChange = {(e)=>setUser({...user, password:e.target.value})}
            placeholder="Enter your password"

/>

<button className="btn" onClick={onLogin}>
    Login
</button>
<Link href="/signup" className="text-sm text-gray-500">
    Don't have an account ? SignUp
</Link>

        </div>
    )
}








