import { Router } from 'express';
import { uploadImage } from "../controllers/uploadControllers.js";
import  signinform  from '../controllers/signin_config.js'
import  user_config from '../controllers/user_config.js'
import { isAuth } from "../controllers/authusers.js";




var router = Router();

router.get('/signin', function(req, res) {
res.render("pages/signin");
});

router.get('/profile', isAuth ,function(req, res) {
    res.render("pages/profile",{user: req.session.User });
    });
    
router.get('/uaddresource', isAuth ,function(req, res) {
    res.render("pages/user_addresource",{user: req.session.User });
    });
    

router.post("/",signinform.signinform);
router.post("/logout",user_config.logout);
router.post("/profile/:id",user_config.updateProfile);
router.post("/uaddresource", uploadImage ,user_config.UaddResource);


export default router;