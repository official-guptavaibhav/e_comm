const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact_number: { type: Number, required: true },
        password: { type: String, required: true},
        isAdmin: {
            type: Boolean,
            default: false,
            },
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);