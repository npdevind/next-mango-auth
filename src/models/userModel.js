import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:[true, "Please provide username"],
        unique: true
    },
    email:{
        type: String,
        require:[true, "Please provide email"],
        unique: true
    },
    password : {
        type:String,
        require:[true, "Please provide password"],
    },
    status:{
        type:Boolean,
        default:false
    },
    token :String,
    forgetToken : String,
    tokenExpiry: Date
})

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;