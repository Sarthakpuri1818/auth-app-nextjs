

import { connect } from "@/app/dbConfig/dbconfig";
import User from "@/app/model/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { username, name, email, password } = reqBody;
    const finalUsername = username || name;

    console.log("REQ BODY:", reqBody);
    //final username is created to check and confirm both name and username are one only
    

    if (!email || !password || !finalUsername) {
      return NextResponse.json(
        { message: "name/username, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user ( save username, not name)
    
    const newUser = new User({
      username: finalUsername,
      email,
      password: hashedPassword,
    });
// save the user to the database

    const savedUser = await newUser.save();
    

    return NextResponse.json(
      { message: "User created successfully"},
      { status: 201 }
    );

  





      //catch block to handle errors
    } catch (error: any) {
      console.error("SIGNUP ERROR:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

