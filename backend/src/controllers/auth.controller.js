import User from "../models/User.model.js";
import jwt from "jsonwebtoken";


export async function signup(req,res){
    const {email,password,fullName}=req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characers"});
        }

        const emailRegix= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegix.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists,please use a diffrent one"});
        }

        const idx=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser=await User.create({
            email,
            fullName,
            password,
            profilePic:randomAvatar,
        })

        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_Key,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly:true, //prevent XSS attacks
            sameSite:"strict", //prevent CSRF attack
            secure:process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser})

    } catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function login(req,res){
    res.send("Login Route");
}

export function logout(req,res){
    res.send("Logout Route");
}