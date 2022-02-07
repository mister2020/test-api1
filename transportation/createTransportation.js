const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.create = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const [row] = await conn.execute(
            "SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        let price = req.body.distance * 10;

        if(row.length > 0){

            const [rows] = await conn.execute('INSERT INTO `transportation`(`user_id`,`name`,`weidth`,`distance`,`price`) VALUES(?,?,?,?,?)',[
                row[0].id,
                req.body.name,
                req.body.weidth,
                req.body.distance,
                price
            ]);
    
            if (rows.affectedRows === 1) {
                return res.status(201).json({
                    message: "The transportation has been successfully inserted"
                });
            }
        }

        res.json({
            message:"No user found"
        });

        
        
    }catch(err){
        next(err);
    }
}