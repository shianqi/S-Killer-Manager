const express = require('express')
const router = express.Router()

const Users = require('../models/Users')

const haveLogined = function(user) {
    Users.getSize((err, date)=>{
        if(err) {
            console.log(err)
        }else{
            if(!date) {
                new Users({
                    username: 'killer',
                    password: '121021',
                    jwxtId: '',
                    jwxtPw: '',
                    email: ''
                }).save((err)=>{
                    if(err) {
                        console.log(err)
                    }else{
                        console.log('add user success!')
                    }
                })
            }
        }
    })
    return(typeof(user) != 'undefined')
}

module.exports = router
module.exports.haveLogined = haveLogined
