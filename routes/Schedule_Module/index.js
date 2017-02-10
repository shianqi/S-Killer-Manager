/**
 * Created by killer on 2017/2/8.
 */
let JWXT = require('../JWXT_Module/index');
let schedule = require("node-schedule");

let checkExamination = function () {
    new JWXT().checkNewExamination('0141122427', '121021','shianqi@imudges.com');
    new JWXT().checkNewExamination('0141121972', 'PX1069848942','1069848942@qq.com');
};

checkExamination();

let startSchedule = function () {
    let rule = new schedule.RecurrenceRule();
    rule.minute = [1,6,11,16,21,26,31,36,41,46,51,56];

    schedule.scheduleJob(rule, function(){
        checkExamination();
    });
};

module.exports = startSchedule;