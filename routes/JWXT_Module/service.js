/**
 * imu教务系统服务模块
 * Created by killer on 2017/2/5.
 */
let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite'); //用于解决GBK乱码

let email = require('../Email_Module/index');
let Examination = require('../../models/Examination');

let baseUrl = 'http://jwxt.imu.edu.cn/';
let headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko'
    };

class JWXT{
    constructor(){
        this.j = request.jar();
    }
    //修改用户密码
    modifyPassword(userId,newPassword) {
        let option = {
            url: baseUrl+'modifyPassWordAction.do',
            headers: headers,
            jar: this.j,
            form:{
                yhlbdm: '01',
                zjh: userId,
                oldPass: '123456',
                newPass1: newPassword,
                newPass2: newPassword
            }
        };

        return new Promise((resolve, reject)=>{
            this.login('0141122427','121021').then(()=>{
                request.post(option, (error, response, body)=>{
                    if (!error && response.statusCode == 200) {
                        console.log('modify password successful!!!');
                        email('【S-killer】密码修改成功！',
                            `<h2>密码修改成功!!!</h2><p>用户 ${userId} 密码修改成功!!!，新密码：${newPassword}</p>`);
                        resolve();
                    }else if(!error && response.statusCode == 500){
                        reject('Login Error！');
                    }else{
                        reject(error);
                    }
                });
            },(error)=>{
                reject(error);
            });
        });
    };

    //登陆
    login(userId, password) {
        let option = {
            url: baseUrl+'loginAction.do',
            headers: headers,
            jar: this.j,
            form:{
                zjh: userId,
                mm: password
            }
        };
        return new Promise((resolve, reject)=>{
            this.logout().then(()=>{
                request.post(option, (error, response, body)=>{
                    if (!error && response.statusCode == 200) {
                        resolve();
                    }else{
                        console.log('login error!');
                        reject(error);
                    }
                });
            });
        });
    };

    //注销
    logout(){
        let option = {
            url: baseUrl+'logout.do',
            headers: headers,
            jar: this.j,
            form:{
                loginType:'platformLogin',
            }
        };
        return new Promise((resolve, reject)=>{
            request.post(option, (error, response, body)=>{
                if (!error && response.statusCode == 200) {
                    resolve();
                }else{
                    console.log('logout error!');
                    reject(error);
                }
            });
        })
    }

    //获取成绩
    getExamination(userId, password) {
        let option = {
            url: baseUrl+'gradeLnAllAction.do?type=ln&oper=sxinfo',
            encoding: null,
            jar: this.j,
            headers: headers,
        };
        return new Promise((resolve, reject)=>{
            this.login(userId,password).then(()=>{
                request(option, (error, response, body)=>{
                    if (!error && response.statusCode == 200) {
                        let buf =  iconv.decode(body, 'gb2312');
                        let $ = cheerio.load(buf);
                        let list = [];

                        $('.odd').each( (index, tr)=> {
                            let item = {};
                            let arr = [];
                            $(tr).find('td').each((index, td)=>{
                                arr[index] = $(td).text().replace(/[\r\n\s]/g, "");
                            });
                            [item.kch,item.kxh,item.name,item.englishName,item.credit,item.kcsx,item.score,item.reason] = arr;
                            list.push(item);
                        });
                        resolve(list);
                    }else{
                        reject(error);
                    }
                });
            },(error)=>{
                reject(error);
            });
        });
    };

    //打印成绩
    printExamination(userId, password){
        return new Promise((resolve, reject)=>{
            this.getExamination(userId, password).then((list)=>{
                let itemStr = `
                    <h2>用户：${userId} 的成绩单，时间：${new Date().toLocaleDateString()}</h2>
                    <table border="1" cellspacing="1">
                        <tr><th>index</th><th>科目</th><th>绩点</th><th>分数</th></tr>`;
                list.forEach((item,index)=>{
                    itemStr  +=  `
                    <tr>
                        <td>${index+1}</td>
                        <td>${item.name}</td>
                        <td>${item.credit}</td>
                        <td ${parseInt(item.score)<60?'style="color:red"':''}>${item.score}</td>
                    </tr>`;
                });
                itemStr+='</table>';
                email('【S-killer】打印成绩！',itemStr);
                resolve();
            },(error)=>{
                reject(error);
            });
        });
    };

    //检查是否有新成绩
    checkNewExamination(userId, password, emailAddress){
        let examinationListToEmail = function (list) {
            let str = `
                <h2>用户：${userId} 有新成绩，时间：${new Date().toLocaleDateString()}</h2>
                <table border="1" cellspacing="1">
                    <tr><th>index</th><th>科目</th><th>绩点</th><th>分数</th></tr>`;
            list.forEach((item,index)=>{
                str += `
                    <tr>
                        <td>${index+1}</td>
                        <td>${item.name}</td>
                        <td>${item.credit}</td>
                        <td ${parseInt(item.score)<60?'style="color:red"':''}>${item.score}</td>
                    </tr>`;
            });
            str+='</table>';
            return str;
        };

        console.log('开始查询'+userId+'的分数');

        return new Promise((resolve, reject)=>{
            this.getExamination(userId,password).then((list)=>{
                console.log(`用户${userId}分数查询成功，共${list.length}条`);
                Examination.findByUsername(userId, (err,date)=>{
                    if(err){
                        console.log(`查询本地成绩失败，原因：${err}`);
                        reject(err);
                    }else{
                        list.sort((a,b)=>{
                            return a.kch-b.kch;
                        });
                        if(date==null){
                            new Examination({
                                examination : list,
                                userId : userId
                            }).save(()=>{
                                console.log(`本地数据为空，保存${list.length}条数据成功！`);
                                resolve();
                            });
                        }else{
                            let temp = [];
                            list.forEach((listItem)=>{
                                let flag = true;
                                date.examination.forEach((dateItem)=>{
                                    if(dateItem.kch===listItem.kch&&dateItem.score===listItem.score){
                                        flag = false;
                                    }
                                });
                                if(flag){
                                    temp.push(listItem);
                                }
                            });
                            if(temp.length!=0){
                                console.log(`用户${userId}有${temp.length}门新成绩`);
                                email('【S-killer】您有新的成绩！',examinationListToEmail(temp),emailAddress);
                                date.examination = list;
                                date.save(()=>{ resolve(); });
                            }else {
                                console.log(`没有新成绩！`);
                            }
                        }
                    }
                });
            },(error)=>{
                reject(error);
            });
        });
    }
}
module.exports = JWXT;
