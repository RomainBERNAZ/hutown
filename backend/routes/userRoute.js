import express from 'express'
import User from '../models/userModel.js'
import { getToken } from '../util.js';

const router = express.Router();


router.post('/login', async (req, res) => {
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(loginUser){
        res.send({
            _id: loginUser.id,
            name: loginUser.name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            token: getToken(loginUser)
        })

    }else{
        res.status(401).send({msg : 'Mot de passe ou email invalide'})
}
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name:'romain',
            email:'romain@mail.com',
            password:'pass',
            isAdmin:true
        });
        const newUser = await user.save();
        res.send(newUser)
    } catch (error) {
        res.send({msg : error.message})
    }
})
export default router;