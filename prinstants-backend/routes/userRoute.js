import express from 'express';
import User from '../models/userModel'
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
        const signinUser = await User.findOne({
                email: req.body.email,
                password: req.body.password
        });
        if(signinUser) {
                res.send({
                        id: signinUser.id,
                        name: signinUser.name,
                        email: signinUser.email,
                        isAdmin: signinUser.isAdmin,
                        token: getToken(signinUser)
                })
        }else {
                res.status(401).send({msg: 'Invalid Email or Password.'});
        }
} )

router.post('/register', async (req, res) => {
        const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
        });
        const newUser = await user.save();


        if(user) {
                res.send({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: getToken(user)
                })
        }else {
                res.status(401).send({msg: 'Invalid Email or Password.'});
        }
} )

router.get("/createadmin", async (req,res, next) => {
        try{
                const user = new User({
                        name: 'Patrick',
                        email:'paleagles93@yahoo.com',
                        password: '1234',
                        isAdmin: true,
                });

                const newUser = await user.save();
                res.send(newUser);
        }catch(error){
                res.send({msg: `err:${error.reason}`})
        }
})

export default router;