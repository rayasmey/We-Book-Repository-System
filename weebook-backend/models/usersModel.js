import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    password: {type: String, required: true},
});

userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  
    next();
  });
export default model('User', userSchema);