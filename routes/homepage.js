import { Router } from 'express';



var router = Router();

router.get('/', function(req, res) {
 
  
res.render("pages/index");

 
});


export default router;