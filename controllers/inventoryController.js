import inventoryModel from '../models/inventoryModel.js';
import userModel from './../models/userModel.js';

// Create Inventory
export const createInventory = async(req,res) =>{
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      throw new Error('User Not Found');
    }
    if(inventoryType === 'in' && user.role !== 'donar'){
      throw new Error('Not a donar account');
    }
    if(inventoryType === 'out' && user.role !== 'hospital'){
      throw new Error('Not a hospital');
    }
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New blood record added"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory api",
      error
    });
  }
}

//Get inventory
export const getInventory = async(req,res) =>{
  try {
    const inventory = await inventoryModel
                        .find({organization:req.body.userId})
                        .populate('donar')
                        .populate('hospital')
                        .sort({createAt: -1});

    return res.status(200).send({
      success:true,
      message:"Get all records successfully",
      inventory
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory",
      error
    });
  }
}