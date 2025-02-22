import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
const Schema = mongoose.Schema;
const passwordSchema = z.string().min(6).regex(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/);
const ReportSchema = new Schema(
    {   
        orgid:{
            type:String,
            unique:true,
            require:true,
        },
        //for online threat
        
        harassername: {
            type: String,
            required: [true, "Please provide the harasser name"],
        },//for all
        harrasserdetails:{
            type:String,
            required:[true, "Please provide the department or desg he/she works in"],
        },//for all
        harassernumber:{
            type:Number,

        },//for all(not mandatory)
        details:{
            type:String,
            required:true,
        },//harassment details//for all
       type: {
            type: String,
            enum: ['Online Threat','Sexual Abuse', 'Censored photograph','Private Video Leak'],//stalking ta ekhane add korte hobe
            required: true
        },
        evidence:{
            type: [String], // Must be an array of strings (URLs)
            required: [true, "Evidence is required."],
        }

    },
    {
        timestamps: true,
    }

);
export default mongoose.model("Report", ReportSchema); 
// evidence:{
//     type: [String], // Must be an array of strings (URLs)
//     validate: {
//         validator: function (value) {
//             return Array.isArray(value) && value.length > 0; // Ensure at least one evidence file is provided
//         },
//         message: "At least one evidence file is required."
//     },
//     required: [true, "Evidence is required."],
// }