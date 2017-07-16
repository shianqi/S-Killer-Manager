/**
 * 教务系统主模块
 * Created by killer on 2017/2/27.
 */
const express = require('express')
const router = express.Router()
const haveLogined = require('../users').haveLogined
const JWXT = require('./service')
const Schedule = require('./schedule')

Schedule.start()

router.get('/getScheduleState', (req, res)=>{
    if(haveLogined(req.session.user)) {
        res.json({state:1, result: Schedule.getState()})
    }else{
        res.json({state:0, reason:'权限不足'})
    }
})

router.post('/setScheduleState', (req, res)=>{
    if(haveLogined(req.session.user)) {
        if(req.body.scheduleState=='true') {
            Schedule.start()
            res.json({state:1, result: Schedule.getState()})
        }else{
            Schedule.cancel()
            res.json({state:1, result: Schedule.getState()})
        }
    }else{
        res.json({state:0, reason:'权限不足'})
    }
})

router.get('/serviceManagement', (req, res)=>{
    if(haveLogined(req.session.user)) {
        res.render('jwxt/serviceManagement')
    }else{
        res.redirect('/login')
    }
})

router.post('/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)) {
        new JWXT().modifyPassword(req.body.username,req.body.password).then(()=>{
            res.render('success',{message:`User ${req.body.username} Modify Password successfully！`})
        },(error)=>{
            res.render('error',{ error })
        })
    }else{
        res.redirect('/login')
    }
})

router.get('/fixPassword', (req, res)=>{
    if(haveLogined(req.session.user)) {
        res.render('jwxt/fixPassword')
    }else{
        res.redirect('/login')
    }
})

module.exports = router
