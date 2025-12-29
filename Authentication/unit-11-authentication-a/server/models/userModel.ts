import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
/**
* Hint: Why is bcrypt imported here?
*/

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});


userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash the password with salt rounds
    const hashPwd = await bcrypt.hash(this.password, saltRounds);
    this.password = hashPwd;
    next();
  } catch (error: any) {
    next(error);
  }
});


export default mongoose.model('User', userSchema);
