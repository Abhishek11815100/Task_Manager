const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
},{
    timestamps: true,
})


userSchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User',userSchema);