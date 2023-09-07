import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = NextResponse.json({
            message : "Logout successfully",
            success : true
        });
        res.cookies.set("token", "", {httpOnly : true});
        return res;
    } catch (error) {
        return NextResponse.json({error:error.message, status : 500});
    }
}