let request = require('request')

const host = 'http://202.207.7.180:8081/ClientWeb/pro/ajax/'
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko'
}

function getMessage() {
    let option = {
        url: host+'device.aspx',
        headers: headers,
        jar: this.j,
        form:{
            right: 'detail',
            fr_all_day: 'false',
            room_id: '100485887',
            name: '1B区',
            open_start: '730',
            open_end: '2200',
            classkind: '8',
            date: '2017-07-16',
            start: '20:10',
            end: '21:10',
            fr_start: '20:10',
            fr_end: '21:10',
            act: 'get_rsv_sta',
            _nocache: '1500206809708'
        }
    }
    return new Promise((resolve, reject)=>{
        request.post(option, (error, response, date)=>{
            if (!error && response.statusCode == 200) {
                resolve(date)
            }else{
                reject(error)
            }
        })
    })
}

module.exports = getMessage
