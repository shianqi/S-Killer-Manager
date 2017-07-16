let express = require('express')
let router = express.Router()
let getMessage = require('./service.js')

router.get('/getMessage', (req, res, next)=>{
    getMessage().then((date)=>{
        console.log(date)
        res.json(JSON.parse(date))
        next()
    })
})

router.get('/getScheduleState', (req, res, next)=>{
    res.json({ state:1 })
    next()
})

module.exports = router
