let express = require('express')
let router = express.Router()

router.get('/getScheduleState', (req, res, next)=>{
    res.json({ state:1 })
    next()
})

module.exports = router
