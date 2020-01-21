"ui";
function setTime(){
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <text text="设置上班时间" textColor="black" textSize="16sp" marginTop="16"/>
                <timepicker id="inTime" timePickerMode="spinner"/>
                <text text="设置下班时间" textColor="black" textSize="16sp" marginTop="16"/>
                <timepicker id="offTime" timePickerMode="spinner"/>
                <text text="通知邮箱(非必填，若设置将会收到打卡结果通知)" textColor="red" textSize="16sp" marginTop="16"/>
                <input id="email" hint="例：12345@qq.com" />
                <button id="save" text="保存" w="*" marginTop="16"/>
                <button id="back" text="返回" w="*"/>
            </vertical>
        </scroll>
    )
    ui.inTime.setIs24HourView(true);
    ui.offTime.setIs24HourView(true);
    
    if(tools.getFromDb("intime")){
        let intime=tools.getFromDb("intime")+0;
        tools.log("库intime："+intime)
        if(!isNaN(intime)){
            ui.inTime.setHour(parseInt(intime/3600))
            ui.inTime.setMinute(parseInt(intime%3600/60))
        }
       
        
    }
    if(tools.getFromDb("offtime")){
        // ui.offTime.setHour(tools.getFromDb("offtime").split(":")[0])
        let offtime=tools.getFromDb("offtime")+0;
        tools.log("库offtime："+offtime)
        if(!isNaN(offtime)){
            
            ui.offTime.setHour(parseInt(offtime/3600))
            ui.offTime.setMinute(parseInt(offtime%3600/60))
        }
        
    }
    
    if(tools.getFromDb("email")){
       
        ui.email.setText(tools.getFromDb("email"));
    }
    
    
    ui.save.on("click", ()=>{
        
        var _in = ui.inTime.getHour()*3600+ui.inTime.getMinute()*60;
        var off = ui.offTime.getHour()*3600+ui.offTime.getMinute()*60;
        var email = String(ui.email.getText());
        tools.log("上班时间:"+_in);
        tools.log("下班时间:"+off);
        tools.log("邮箱:"+email)
    
        tools.saveToDb("intime",_in)
        tools.saveToDb("offtime",off)
        tools.saveToDb("email",email)
        
        toast("时间设置成功");
        begin();
    });
    ui.back.on("click",()=>{

        begin();
    })
}

function begin(){
    try {
        requiresApi(24)
      } catch(err) {

        console.log("安卓版本不能低于7.0")
        return;
      }
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <text text="倒计时：" textColor="black" textSize="16sp" marginTop="16" textSize="30sp" />
                <text id="exeinfo" bg="#FFF8DC" text="未启动脚本" h="100" gravity="center" textSize="25sp" />
                <text id="timeMsg"  bg="#FFF8DC" text="请设置打卡时间" h="50" gravity="center" textSize="15sp" textColor="red"/>
                <checkbox id="showlog" text="显示运行日志" />
                <button id="setTime" text="设置上下班时间" w="*"/>
                <horizontal gravity="center">
                    <button id="start" layout_weight="1" text="启动"  />
                    <button id="stop"  layout_weight="1" text="停止"/>
                </horizontal>
            </vertical>
        </scroll>
    )
    
    if(tools.getFromDb("intime")){

        let intime=tools.getFromDb("intime")+0;
    
        let msg=""
        if(!isNaN(intime)){
            tools.log(parseInt(intime%3600/60))
            msg+="上班时间："+tools.fmtStr(parseInt(intime/3600))+':'+tools.fmtStr(parseInt(intime%3600/60));
        }
        let offtime=tools.getFromDb("offtime")+0;
        if(!isNaN(offtime)){
            msg+="，下班班时间："+tools.fmtStr(parseInt(offtime/3600))+':'+tools.fmtStr(parseInt(offtime%3600/60))  
        }
        if(msg){
            ui.timeMsg.setText(msg);
        }
        
    }
    ui.setTime.on("click", ()=>{
        console.hide();
        setTime()
    });
    ui.stop.on("click", ()=>{
       if(threadId && threadId.isAlive()){
            tools.log("isAlive()")
            threadId.interrupt();
       }
       if(loopId){
            clearInterval(loopId);
            loopId=null;
       }
       ui.exeinfo.setText("未启动脚本");
       toast("停止执行")
    });
    ui.showlog.on("click",(val)=>{
        if(val.isChecked()){
            threads.start(function(){
                console.show();
                console.setSize(device.width, device.height / 3);
                console.setPosition(0, device.height*2/3-100);
    
            })

        }else{
            console.hide();
        }
            
    })

    ui.start.on("click",()=>{
        
        if(!tools.getFromDb("intime") || !tools.getFromDb("offtime")){
            alert("请设置工作时间");
        }else{
            if(isNaN(tools.getFromDb("intime")) || isNaN(tools.getFromDb("offtime"))){
                alert("工作时间错误，请重新设置");
            }else{
                if(!loopId){
                    loop();
                    loopId = setInterval(loop,5000);
                    toast("开始运行...id:"+loopId)
                }else{
                    toast("请勿重复执行，id:"+loopId)
                }
                
            }
            
        }
        
    });

    let tId = threads.start(function(){
                
            checkWrokDay();
            tools.log("工作日："+workday);
    })

}
var workday=false;
function checkWrokDay(){
    let date=new Date();
    //校验法定节假,跳过节日
    if(tools.getFromDb('workday')){
        //{ day: '1-17', flag: true }
        let data = JSON.parse(tools.getFromDb('workday'));
        tools.log(JSON.stringify(data))
        if(data.day != (date.getMonth()+1)+"-"+ date.getDate()){
        
            data.day = (date.getMonth()+1)+"-"+ date.getDate();
            data.flag = tools.isWorkDay();
            tools.saveToDb('workday',JSON.stringify(data));
        }
    
        if(!data.flag){

            workday = false;
        }
    }else{
        tools.saveToDb('workday',JSON.stringify({'day':(date.getMonth()+1)+"-"+ date.getDate(),'flag':tools.isWorkDay()}))
    }
    workday = true;
}
var loopId;
var interval = random(2, 10);//提前10分钟
    interval = 0;//提前10分钟
var threadId;
function loop(){
    toast("running...")
    if(threadId!=null && threadId.isAlive()){
        tools.log("loop isAlive()");
        return;
    }

    tools.log("loop................................."+threadId)
    let intime=tools.getFromDb("intime")+0;
    let offtime=tools.getFromDb("offtime")+0;

    
    let date=new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    //console.log()
    if(h < 18){//上班
        let val = h*3600+m*60+s -(intime-interval*60);
        let msg = "";
        if(val > 0){
             console.log("***************")
             console.log(offtime+interval*60)
             console.log((offtime+interval*60) - h*3600+m*60+s)
            ui.exeinfo.setText(getStringTime((offtime+interval*60) - (h*3600+m*60+s)))
        }else{
            ui.exeinfo.setText(getStringTime(val*-1))
        }
        

        //是否已经打过了卡
        if(tools.getFromDb("inDate") == tools.getToDay()){
            tools.log("今天已经打上班卡");
            return;
        }

        if( val > 0){
            
            if(intime>h*3600+m*60+s-120){//冗余2分钟，迟到2分钟内尝试重复打卡
                tools.log(val)
                tools.log("开始上班打卡")
                threadId = threads.start(function(){

                    if(launchDingDing()){

                        goProcess(1);
                    }
                    interval = random(2, 10);//提前10分钟
                })
                
            }
            
        }
    }else{//下班
        
        let val = h*3600+m*60+s -(offtime+interval*60);
        
        if(val > 0){
            ui.exeinfo.setText(getStringTime(24*60*60-h*3600+m*60+s+intime))
        }else{
            ui.exeinfo.setText(getStringTime(val*-1))
        }
        
        // 判断是否已经打过了卡
        if(tools.getFromDb("offDate") == tools.getToDay()){
            tools.log("今天已经打下班卡");
            return;
        }
        
        if( val > 0 && val < 180){//再次冗余3分钟，重新尝试打卡
            
            tools.log("开始下班打卡")
            threadId = threads.start(function(){
                
                if(launchDingDing()){

                    goProcess(2);
    
                }

                tools.log("开始off打卡")
                interval = random(2, 10);//提前10分钟
            })
            
        }
    }


    tools.log("..........end.............")
}
/**
 * 格式化日期
 * @param {} val 
 */
function getStringTime(val){

    let h = parseInt(val/3600);
    let m = parseInt(val%3600/60)
    let s = val%60;
    return h+"时"+m+"分"+s+"秒"

}

const tbName="dingding";
var tools={
     getToDay:function(){
        var date = new Date();
        return date.getFullYear()+this.fmtStr(date.getMonth()+1)+""+this.fmtStr(date.getDate())
     },
     saveToDb:function(key,val,tb){
        if(!tb){
          tb=tbName;
        }
        var storage = storages.create(tb);
        storage.put(key,val);
      },
      getFromDb:function(key,tb){
        if(!tb){
            tb=tbName;
          }
        var storage = storages.create(tb);
        return storage.get(key);
      },
      removeFromDb:function(key,tb){
        if(!tb){
            tb=tbName;
          }
        var storage = storages.create(tb);
        return storage.remove(key);
      },
      log(msg){
            console.log(msg)
      },
      fmtStr(num){
         if(isNaN(num)){
             return ""
         }
         if(num+0<10){
            return "0"+num;
         }
         return num;
      },
      isWorkDay(){//工作日对应结果为 0, 休息日对应结果为 1, 节假日对应的结果为 2；
        var r = http.get("http://tool.bitefu.net/jiari/?d="+this.getToDay());
        // this.log("http://tool.bitefu.net/jiari/?d="+this.getToDay())
        // this.log(this.getToDay())
        if(r.statusCode == "200"){
            let rs  = r.body.string();
            this.log(rs)
            return rs=="0";
        }
      }
}


function launchDingDing(){
    tools.log("启动dingding")
    //点亮屏幕
    device.wakeUp();
    //回到主页
    home();
    //启动app
    launchApp("钉钉");
    var pwd = id("et_pwd_login").findOne(5000);
    if(pwd){
        tools.log("尝试自动输入密码。。。。")
        pwd.setText("computer");
        id("btn_next").findOne(3000).click();
    }else{
        tools.log("跳过登录")
    }
    //检测弹窗，如MIUI11提示是否记忆密码
    if(text("取消").findOne(3000)){
        tools.log("关闭多余弹窗")
        back()
    }
    if(text("消息").findOne(1000)){
        tools.log("启动成功")
    }else{
        tools.log("启动失败")
        back();
        return false;
    }
    return true;
}

var times =0;
/**
 * 
 * @param {*} type 1：上班，2：下班
 */
function goProcess(type){
    
    tools.log("type:"+type)
    times++;
    
    var dakaBtn=descStartsWith("上班时间").findOne(5000);
    //log(dakaBtn)
    if(dakaBtn != null){
        inOrOffWork(type)
        tools.log("直接进入打卡页面")
        return;
    }

    var msgBtn = text("消息").findOne(10000);
    var myBtn = text("我的").findOne(10000);
    
    if(myBtn == null){
        tools.log("首页加载失败/超时");
        backDingHome();
        if(times == 2){
            tools.log("第二次尝试打卡失败，结束打卡")
            return;
        }
        tools.log("第二次尝试重新打卡。。。。")
        
        goProcess(type);
    }else{
        
        var r = click(msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2, myBtn.bounds().centerY())
        
        // log((msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2)+"   "+myBtn.bounds().centerY())
        var clockInIcon = desc("考勤打卡").findOne(10000);
        if(clockInIcon == null){
            tools.log("获取考勤打卡图标失败！");
            back()
        }else{
            tools.log("进入打卡页面...");
            clockInIcon.click()
            inOrOffWork(type)
            
        }
    
    }
}


function inOrOffWork(type){
    //处理极速打卡，等待触发极速打卡
    //sleep(5000)
    if(type == 1){
        var inWork = desc("上班打卡").findOne(10000);
        if(inWork == null){
            tools.log("获取上班打卡图标失败！");
        }else{
            desc("上班打卡").findOne().click();
            saveTime(type)
            tools.log("完成上班打卡")
        }
    }else{
        var txt = "下班打卡"
        //txt = "外勤打卡"
        var offWork = desc(txt).findOne(10000);
        if(offWork == null){
            tools.log("获取下班打卡图标失败！");
        
        }else{
            desc(txt).findOne().click();
            saveTime(type)
            tools.log("完成下班打卡")
        }
    }
    sleep(3000)
    var dakaTimes = descStartsWith("打卡时间").find();
    let msg = "打卡日期:"+tools.getToDay()+"\n";
    for(var i=0;i<dakaTimes.length;i++){
        tools.log("已经完成打卡！")
        
        if(i==0){
            saveTime(1)
            tools.log("上班时间："+dakaTimes[i].parent().child(2).desc())
            msg += "上班时间："+dakaTimes[i].parent().child(2).desc()+"\n";
        }else{
            saveTime(2)
            tools.log("下班时间："+dakaTimes[i].parent().child(2).desc())
            msg += "下班时间："+dakaTimes[i].parent().child(2).desc()
        }
    }
    //邮件通知
    if(dakaTimes.length > 0){
        
        if(tools.getFromDb("email")){
            var res = http.post("www.seeyou-again.cn:9696/mail/send", {
                "mail": tools.getFromDb("email"),
                "text": msg
            });
        }
        tools.log(msg)
    }
}
/**
 * 保存当天的时间
 * @param  type 
 */
function saveTime(type){
    if(type == 1){

        tools.saveToDb("inDate",tools.getToDay())
    }else{
        
        tools.saveToDb("offDate",tools.getToDay())
    }
}
function backDingHome(){
    var backBtn = id("back_layout").findOne(3000)
    while(backBtn != null){
        backBtn.click()
        backBtn = id("back_layout").findOne(3000)
    }
}

console.log("-------------end---------------")

begin();

function aaa(){
    // tools.saveToDb("email","334694375@qq.com")
    tools.log(tools.getFromDb("email"))
}
// aaa()
// tools.saveToDb('workday',JSON.stringify({'day':'1111111','flag':tools.isWorkDay()}))
// tools.removeFromDb('workday')
// tools.log(tools.getToDay())
