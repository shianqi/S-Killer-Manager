/**
 * Created by killer on 2017/2/8.
 */
const JWXT = require('./service')
const schedule = require('node-schedule')
let mySchedule = null

const checkExamination = function() {
    const userList = [
        {username:'0141122427',password:'121021',email:'shianqi@imudges.com'}
        // {username:'0141121972',password:'PX1069848942',email:'1069848942@qq.com'},
    ]
    userList.forEach((user)=> {
        const jwxt = new JWXT()
        jwxt.checkNewExamination(user.username, user.password, user.email).then(() => {
            jwxt.logout()
        }, (error) => {
            console.log(error)
        })
    })
}

const start = function() {
    const rule = new schedule.RecurrenceRule()
    rule.minute = [1,6,11,16,21,26,31,36,41,46,51,56]
    checkExamination()
    mySchedule = schedule.scheduleJob(rule, function() {
        checkExamination()
    })
    console.log('JWXT Service has started!')
    mySchedule.state = true
}

const cancel = function() {
    if(mySchedule!=null) {
        mySchedule.cancel()
        console.log('JWXT Service has stopped!')
        mySchedule.state = false
    }
}

const getState = function() {
    if(mySchedule.state!=null) {
        return mySchedule.state
    }else{
        return false
    }
}

module.exports.start = start
module.exports.cancel = cancel
module.exports.getState = getState
