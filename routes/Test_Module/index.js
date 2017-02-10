/**
 * test
 * Created by killer on 2017/2/6.
 */
let request = require('request');
let JWXT = require('../JWXT_Module/index');

let jwxt = new JWXT();
jwxt.checkNewExamination('0141122427', '121021','shianqi@imudges.com');