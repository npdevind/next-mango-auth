import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();


export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const {username, password} = body;

        const user = await User.findOne({username});
        if(!user) throw Error("User not found");      
       
        const checkPassword = await bcryptjs.compareSync(password, user.password);
              
        if(!checkPassword) throw Error("invalid password");

        const tokenData = {
            id: user._id,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const res = NextResponse.json({
            message :"login successfully"
        })
        res.cookies.set("token", token, { httpOnly : true});

        return res;

    } catch (error:any) {
        //console.log(error.message);
        
        return NextResponse.json({error:error.message, status : 500});
    }
}