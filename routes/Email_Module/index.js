/**
 * S-Killer 邮件模块
 * Created by killer on 2017/2/5.
 */
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '1210219084@qq.com',
        pass: 'imudgessaq*963.'
    }
});

let Email_Module = function (title='【S-Killer】',html='<b>Hello world!</b>',emailAddress='shianqi@imudges.com') {
    let mailOptions = {
        from: '1210219084@qq.com', // 发件地址
        to: emailAddress, // 收件列表
        subject: title, // 标题
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) return console.log(error);
        console.log(`Mail sent: ${info.response} sent to ${emailAddress}`);
    });
};

module.exports = Email_Module;