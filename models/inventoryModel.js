import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  inventoryType:{
    type: String,
    required: [true, 'Inventory type is required'],
    enum: ['in','out']
  },
  bloodGroup:{
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['O+','O-','AB+','AB-', 'A+','A-', 'B+','B-']
  },
  quantity:{
    type: Number,
    required: [true, 'Blood quantify is required']
  },
  organization:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Organization is required']
  },
  hospital:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: function(){
      return this.inventoryType === "out";
    }
  },
  donar:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: function(){
      return this.inventoryType === "in";
    }
  },
},{timestamps:true});

export default mongoose.model('inventories', inventorySchema);