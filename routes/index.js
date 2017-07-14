let express = require('express')
let router = express.Router()

let Users = require('../models/Users')
let JWXT = require('./JWXT_Module/service')
let haveLogined = require('./users').haveLogined

router.get('/', function(req, res) {
    if(haveLogined(req.session.user)){
        res.render('index',{username:req.session.user.username})
    }else{
        res.redirect('/login')
    }
})

router.get('/login', function (req, res, next) {
    res.render('login',{'message':''})
    next()
})

router.get('/logout', function (req, res, next) {
    req.session.user = undefined
    res.redirect('/login')
    next()
})

router.post('/login', function (req, res, next) {
    Users.findByUsername(req.body.username,function (err,date) {
        if(err){
            res.render('error',{'message':err})
        }else{
            if(date==null){
                res.render('login',{'message':'用户名或密码错误！'})
            }else if(req.body.username==date.username&&req.body.password==date.password){
                req.session.user = date
                res.redirect('/')
            }else{
                res.render('login',{'message':'用户名或密码错误！'})
            }
        }
    })
    next()
})

router.get('/fixPassword', (req, res, next)=>{
    if(haveLogined(req.session.user)){
        res.render('fixPassword',{message:''})
    }else{
        res.redirect('/login')
    }
    next()
})

/**
 * username password newPassword
 */
router.post('/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)){
        Users.findByUsername(req.body.username, (err, date)=>{
            if(err){
                console.log(err)
            }else{
                if(req.body.username==date.username&&req.body.password==date.password){
                    date.password = req.body.newPassword
                    date.save(function (err) {
                        if(err){
                            console.log(err)
                        }else{
                            res.render('success',{'message':'修改密码成功！'})
                        }
                    })
                }else {
                    res.render('fixPassword',{message:'The username does not exist or the password is incorrect'})
                }
            }
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/getExamination', (req, res )=>{
    if(haveLogined(req.session.user)){
        new JWXT().checkNewExamination('0141122427','121021')
        res.render('success',{'message':'Examination updated successfully！'})
    }else{
        res.redirect('/login')
    }
})

router.get('/home', function(req, res) {
    if(haveLogined(req.session.user)){
        res.render('home')
    }else{
        res.redirect('/login')
    }
})

module.exports = router
