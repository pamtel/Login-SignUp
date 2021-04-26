import { Schema, model } from "mongoose";

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
    },
    password: {
        type: String,
    },
});

const UserModel = model("Users", userSchema);

export default UserModel;