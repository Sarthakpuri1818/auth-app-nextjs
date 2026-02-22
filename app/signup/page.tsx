"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "./signup.css";






export default function SignupPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        name:"",
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    useEffect(()=>{
        if(user.email.length > 0){
            setButtonDisabled(false);

        }else{
            setButtonDisabled(true);
        }
    },[user])

    const [loading, setLoading]= React.useState(false);

    const onSignup = async ()=>{
        try{
            setLoading(true);
          const response =   await axios.post("/api/users/signup", user);
            console.log("signup success", response.data);
            toast.success("signup succesfull")

            router.push("/login");

        }catch(error){
         

            toast.error("Signup failed. Please try again.");

        }finally{
            setLoading(false);

        }

    }
    return(
        <div className="sign">
            <h1 className="text text-2xl text-black bg-center">SignUp</h1>

            <label htmlFor="name">Name</label>
            <input 
            type = "text" 
            id = "name"
            value = {user.name}
            onChange = {(e)=>setUser({...user, name:e.target.value})}
            placeholder="Enter your name"

/>

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
<hr />
<button className="btn" onClick={onSignup} >
    SIGN UP
    {/* {buttonDisabled ? "Please enter email" : "SignUp"} */}
</button>
<hr />
<Link href="/login" className="text-sm text-gray-500">
  Already have an account 
</Link>

        </div>
    )

 

}





