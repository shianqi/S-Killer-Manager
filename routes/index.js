let express = require('express');
let router = express.Router();
let session = require('express-session');

let Users = require('../models/Users');
let Examination = require('../models/Examination');

let JWXT = require('./JWXT_Module/index');

let haveLogined = function (user) {
    Users.getSize((err, date)=>{
        if(err){
            console.log(err);
        }else{
            if(!date){
                let user = new Users({
                    username: 'killer',
                    password: '121021',
                    jwxtId: '',
                    jwxtPw: '',
                    email: '',
                });
                user.save((err)=>{
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

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*100 //cookie有效时间10min
    }
}));

router.get('/', function(req, res) {
    if(haveLogined(req.session.user)){
        res.render('index',{username:req.session.user.username});
        console.log(req.session.user);
    }else{
        res.redirect('/login');
    }
});

router.get('/login', function (req, res, next) {
    res.render('login',{'message':''});
});

router.get('/logout', function (req, res, next) {
    req.session.user = undefined;
    res.redirect('/login');
});

router.post('/login', function (req, res) {
    Users.findByUsername(req.body.username,function (err,date) {
        if(err){
            res.render('error',{'message':err})
        }else{
            if(date==null){
                res.render('login',{'message':'用户名或密码错误！'});
            }else if(req.body.username==date.username&&req.body.password==date.password){
                req.session.user = date;
                res.redirect('/');
            }else{
                res.render('login',{'message':'用户名或密码错误！'});
            }
        }
    });
});

router.get('/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)){
        res.render('fixPassword',{message:''});
    }else{
        res.redirect("/login");
    }
});

/**
 * username password newPassword
 */
router.post('/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)){
        Users.findByUsername(req.body.username, (err, date)=>{
            if(err){
                console.log(err);
            }else{
                if(req.body.username==date.username&&req.body.password==date.password){
                    date.password = req.body.newPassword;
                    date.save(function (err) {
                        if(err){
                            console.log(err);
                        }else{
                            res.render('success',{'message':'修改密码成功！'});
                        }
                    });
                }else {
                    res.render('fixPassword',{message:'The username does not exist or the password is incorrect'});
                }
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/getExamination', (req, res )=>{
    if(haveLogined(req.session.user)){
        new JWXT().checkNewExamination('0141122427','121021');
        res.render('success',{'message':'Examination updated successfully！'});
    }else{
        res.redirect('/login');
    }
});

router.post('/JWXT/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)){
        new JWXT().modifyPassword(req.body.username,req.body.password).then(()=>{
            res.render('success',{'message':`User ${req.body.username} Modify Password successfully！`});
        },(error)=>{
            res.render('error',{'error':error});
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/JWXT/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)){
        res.render('JWXT/fixPassword');
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
