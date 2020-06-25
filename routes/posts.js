const router = require('express').Router();
const verify = require('./verifyToken');

//only way to access this route is with the jwt at the header of the request
router.get('/',verify ,(req, res) =>{
    res.send(req.user);
});


module.exports = router;  