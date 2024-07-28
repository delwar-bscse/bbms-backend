import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

//Registration Controller
export const registerController = async(req,res) => {
  try{
    const existingUser = await userModel.findOne({email:req.body.email});
    if(existingUser){
      return res.status(200).send({
        success: false,
        message: "User already exists"
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user
    });
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      error
    });
  };
};

//Login Controller
export const loginController = async(req,res) => {
  try{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
      return res.status(404).send({
        success: false,
        message: "User not exists"
      });
    }
    if(user.role !== req.body.role){
      return res.status(500).send({
        success: false,
        message: "Role doesn't match"
      });
    }
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if(!comparePassword){
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
      });
    }
    const token = JWT.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return res.status(200).send({
        success: true,
        message: "Login successfully",
        token,
        user
    });
  }catch(error){
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login api",
      error
    });}
};

//Get Current User
export const currentUserController = async(req,res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId});
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error
    });
  }
}