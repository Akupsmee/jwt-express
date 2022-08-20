import express from 'express';
const router = express.Router();

import User from '../models/user.model.js';

router.post("/register" , async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.send(user);
})
router.post("/login" , async(req, res, next) => {
    res.send("login");
})
router.delete("/logout" , async(req, res, next) => {
    res.send("logout");
})
router.post("/refresh-token" , async(req, res, next) => {
    res.send("Refresh-token");
})




export default router;