import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ['donar','admin','organization','hospital']
  },
  name: {
    type: String,
    required: function(){
      if(this.role === 'donar' || this.role === 'admin'){
        return true;
      }else{
        return false;
      }
    }
  },
  organization: {
    type: String,
    required: function(){
      if(this.role === 'organization'){
        return true;
      }else{
        return false;
      }
    }
  },
  hospital: {
    type: String,
    required: function(){
      if(this.role === 'hospital'){
        return true;
      }else{
        return false;
      }
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  website: {
    type: String
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone is required"]
  },
},{timestamps:true});

const userModel = mongoose.model('users',userSchema);

export default userModel;