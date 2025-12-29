import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        trim: true
    },
    expiresAt:{
        type: Date,
        default: null,
        index : true
    },
    maxViews:{
        type: Number,
        default: null,
        min: 1
    },
    views:{
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps: true})

const Paste = mongoose.model("Paste", pasteSchema);
export default Paste;