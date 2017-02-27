/**
 * 教务系统服务管理页面js
 * Created by killer on 2017/2/27.
 */
new Vue({
    el: '#main',
    data: {
        /**
         * 1: 操作中
         * 2: 已开启
         * 3: 未开启
         */
        state: 1,
    },
    methods: {
        getText: function () {
            if(this.state==1){
                return '请稍候';
            }else if(this.state==2){
                return '已启动';
            }else{
                return '未启动';
            }
        },
        reverseMessage: function () {
            let url = 'setScheduleState';
            let data = {};
            if(this.state==2){
                data.scheduleState = false;
            }else{
                data.scheduleState = true;
            }
            this.state = 1;
            $.post(url,data,(data)=>{
                if(data.state){
                    if(data.result){
                        this.state = 2;
                    }else{
                        this.state = 3;
                    }
                }
            });
        },
    },
    mounted: function () {
        let url = 'getScheduleState';
        $.get(url,(data)=>{
            if(data.state){
                if(data.result){
                    this.state = 2;
                }else{
                    this.state = 3;
                }
            }
        });
    }
});