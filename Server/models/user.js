import {Schema, model} from 'mongoose';
import { createTokenForUser } from '../services/auth.js';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            required: true,
            type: String,
        },
        salt: {
            type: String,            
        } ,
        profileImgURL: {
            type: String,
            default: '/images/default.png',
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: "USER",
        },
    },
    { timestamps: true}
);

const User = model('user', userSchema);
export default User;