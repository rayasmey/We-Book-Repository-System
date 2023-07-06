export async function checkRole(req, res, next){
    if (req.token.role === 'admin') {
        next();
      } else {
        res.status(process.env.UNAUTHORIZED).json({ error: 'Unauthorized for this operation'});
      }
}