import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
const Schema = mongoose.Schema;
const passwordSchema = z.string().min(6).regex(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/);
const ReportSchema = new Schema(
    {   
        //for online threat
        platname: {
            type: String,
            unique: true,
        },//for photo,video leak,online threat
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
        screenshots:{
            type:String,
            required:true,
        },//prrof of harassment
        
        //for private video leak
        video:{
            type:String,
            required:true,
        },
        //for private photo leak
        photo:{
            type:String,
            required:true,
        },
        
        //for sexual abuse
        place:{
            type:String,
            required:true,
        },
        
        type: {
            type: String,
            enum: ['Online Threat','Sexual Abuse', 'Censored photograph','Private Video Leak'],//stalking ta ekhane add korte hobe
            required: true
        },

    },
    {
        timestamps: true,
    }

);
export default mongoose.model("Report", ReportSchema); 