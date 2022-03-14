const {mongoose, Schema, Model} = require("mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true,
    },
    country:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},
{
    timestamps: true
}

);

module.exports = Model("User", userSchema);