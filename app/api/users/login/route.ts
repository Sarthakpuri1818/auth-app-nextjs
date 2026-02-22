

import { connect } from "@/app/dbConfig/dbconfig";
import User from "@/app/model/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest){
    try{
        await connect();
      const reqbody= await  request.json()
      const {email,password}= reqbody;
      console.log(reqbody);

         if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }



      //check if user exists
       const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
   

    
      //check if password is correct


      const validPassword = await bcrypt.compare(password,user.password);
      if(!validPassword){
        return NextResponse.json({error:"invalid password"}, {status:400})


      }

      // create a token data

      const tokendata = {
        id: user._id,//this is everytime in database it is there with id 
        username : user.username,
        email: user.email

      }

      //create a token secret from env file 
        const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "TOKEN_SECRET is missing in .env.local" },
        { status: 500 }
      );
    }

      // create a token
      const token = jwt.sign(tokendata, secret, { expiresIn: "7d" });

      
        //response
       const response=   NextResponse.json({message:"login successful"}, 
            {status:200});

      

      // set the cookie

            response.cookies.set("token", token, {
                httpOnly:true
                
            })

            return response;


            

        







    }catch(error:any){
        return NextResponse.json({message:error.message}, {status:500});

    }
}