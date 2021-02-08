import jwt from 'jsonwebtoken'
import config from './config.js'

const getToken = (user) => {
    return jwt.sign({
        _id:user.id,
        name:user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET,{
        expiresIn:'48h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization; 
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(401).send({msg :'Token non valide'})
            }
            req.user = token;
            next();
            return
        });
    }
    return res.status(401).send({msg :'token is not supplied'})
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg : 'Admin token nest pas valide'})
}

export {getToken, isAuth, isAdmin}