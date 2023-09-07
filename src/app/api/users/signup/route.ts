import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();


export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        const {username, email, password} = body;        
        const getUser = await User.findOne({username});        
        if(getUser) {
            return NextResponse.json({error: "This user already exist"}, {status: 400})
        };
        const hashPass = await bcryptjs.hash(String(password), 10);
        const setNewUser = new User({
            username, 
            email,
            password : hashPass
        })        
        await setNewUser.save();
        return NextResponse.json({message: "user created"}, {status: 200})        
    } catch (error:any) {
        console.log(error);
        
        return NextResponse.json({error: error.message}, {status: 500})
    }
}