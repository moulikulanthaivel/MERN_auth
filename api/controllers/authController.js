import User from "../models/routeModel.js";
import bcryptjs from "bcryptjs"

export const signup = async(req,res ,next)=>{
    const {username,email,password}=req.body;
  
try {
  const hashedPassword = bcryptjs.hashSync(password,10)
  const newUser = await new User ({username,email,password:hashedPassword});
     await newUser.save()
     res.status(200).json({messege: "User created successfully"})
} 

catch (error) {
  next(error)
}
}