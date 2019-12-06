
var times =0;
/**
 * 
 * @param {*} type 1：上班，2：下班
 */
function start(type){
    times++;
    launchDingDing();
    
    var dakaBtn=descStartsWith("上班时间").findOne(5000);
    //log(dakaBtn)
    if(dakaBtn != null){
        inOrOffWork(type)
        log("直接进入打卡页面")
        return;
    }

    var msgBtn = text("消息").findOne(10000);
    var myBtn = text("我的").findOne(10000);
    
    if(myBtn == null){
        log("首页加载失败/超时");
        backDingHome();
        if(times == 2){
            log("第二次尝试打卡失败，结束打卡")
            return;
        }
        log("第二次尝试重新打卡。。。。")
        
        start(type);
    }else{
        click(msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2, myBtn.bounds().centerY())
        // log((msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2)+"   "+myBtn.bounds().centerY())
        
        var clockInIcon = desc("考勤打卡").findOne(10000);
        if(clockInIcon == null){
            log("获取考勤打卡图标失败！");
            
        }else{
            clockInIcon.click()
            inOrOffWork(type)
            
        }
    
    }
}
function launchDingDing(){
    //点亮屏幕
    device.wakeUp();
    //回到主页
    home();
    //启动app
    launchApp("钉钉")
}

function inOrOffWork(type){
    //处理极速打卡，等待触发极速打卡
    //sleep(5000)

    if(type == 1){
        var inWork = desc("上班打卡").findOne(10000);
        if(inWork == null){
            log("获取上班打卡图标失败！");
        }else{
            desc("上班打卡").findOne().click();
            log("完成上班打卡")
        }
    }else{
        var txt = "下班打卡"
        //txt = "外勤打卡"
        var offWork = desc(txt).findOne(10000);
        if(offWork == null){
            log("获取下班打卡图标失败！");
        
        }else{
            desc(txt).findOne().click();
            log("完成下班打卡")
        }
    }
    sleep(3000)
    var dakaTimes = descStartsWith("打卡时间").find();
    for(var i=0;i<dakaTimes.length;i++){
        log("已经完成打卡！")
        if(i==0){
            log("上班时间："+dakaTimes[i].parent().child(2).desc())
        }else{
            log("下班时间："+dakaTimes[i].parent().child(2).desc())
        }
    }
}
function backDingHome(){
    var backBtn = id("back_layout").findOne(3000)
    while(backBtn != null){
        backBtn.click()
        backBtn = id("back_layout").findOne(3000)
    }
}


start(2)





console.log(".***************************************")
function log(msg){
    console.log("msg:" + msg)
};
