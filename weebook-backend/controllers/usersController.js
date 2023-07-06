import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function signup(req, res, next) {
    const {name, email, password, role} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
           return next(new Error("User already exist!")); 
        }
        const user = await User.create({name, email, password, role});
        const token = jwt.sign({...user, password: '' }, process.env.SECRET_KEY);
        return res.json({ success: true, data: token });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error("Username or password is not valid!"));
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return next(new Error("Username or password is not valid!"));
        }
        
        const token = jwt.sign({...user, password: '' },  process.env.SECRET_KEY);
        return res.json({ success: true, data: token });
    } catch (error) {
        return next(error);
    }
}