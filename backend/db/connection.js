import mongoose from "mongoose";

const connect_to_mongodb = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI);
        console.log("database connected");
    } catch (error) {
        console.log("error connecting database");
    }
}

export default connect_to_mongodb;