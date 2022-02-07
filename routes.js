const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {getAllUsers} = require('./controllers/getUserController');
const {getUserTransportations} = require('./transportation/getTransportation');
const {create} = require('./transportation/createTransportation');

router.post('/create', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('weidth',"Incorrect value")
    .notEmpty()
    .escape()
    .trim(),
    body('distance',"Incorrect value")
    .notEmpty()
    .escape()
    .trim()
], create);

router.post('/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
],login);

router.get('/getuser',getUser);
router.get('/getusers',getAllUsers);
router.get('/gettransportations',getUserTransportations);

module.exports = router;