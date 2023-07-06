import Jwt from 'jsonwebtoken';

export async function checkAuth(req, res, next) {
    try {
        const header = req.headers['authorization'];
        const token = header.split(' ')[1];
        if (token) {
            const decoded = Jwt.verify(token, process.env.SECRET_KEY);
            if(decoded){
                req.token = {...decoded._doc, password: ''};
                return next();
            }else{
                return next(new Error('Invalid token'));
            }
        }
        else{
           return next(new Error("Token not found"));
        }
    } catch (e) {
        return next(e);
    }
}