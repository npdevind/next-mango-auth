import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDb connected successfully');
        })

        connection.on('error', (err)=>{
            console.log("MongoDb Connection Issue :" + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}