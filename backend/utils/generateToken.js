import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"30d"});

    res.cookie("notfilxToken",token,{
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true, //prevent client-side JavaScript from accessing the cookie
        sameSite: "strict", //prevent CSRF attacks
        secure: ENV_VARS.NODE_ENV !== "development", //set to true if using HTTPS
    })
    return token;
}