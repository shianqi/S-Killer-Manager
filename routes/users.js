let express = require('express');
let router = express.Router();

let Users = require('../models/Users');

let haveLogined = function (user) {
    Users.getSize((err, date)=>{
        if(err){
            console.log(err);
        }else{
            if(!date){
                new Users({
                    username: 'killer',
                    password: '121021',
                    jwxtId: '',
                    jwxtPw: '',
                    email: '',
                }).save((err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(`add user ${user.username} success!`);
                    }
                });
            }
        }
    });
    return(typeof(user) != "undefined");
};

module.exports = router;
module.exports.haveLogined = haveLogined;
