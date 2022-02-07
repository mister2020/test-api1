const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getUserTransportations = async (req,res,next) => {

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

        if(row.length > 0){
            
            const [rows] = await conn.query(
                "SELECT `id`,`user_id`,`name`,`weidth`,`distance`,`price` FROM `transportation` WHERE `user_id`=?",
                row[0].id
            );

            return res.json({
                transportations:rows
            });

        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}
