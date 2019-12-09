"ui";
function setTime(){
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <text text="设置上班时间" textColor="black" textSize="16sp" marginTop="16"/>
                <timepicker id="inTime" timePickerMode="spinner"/>
                <text text="设置下班时间" textColor="black" textSize="16sp" marginTop="16"/>
                <timepicker id="offTime" timePickerMode="spinner"/>
                <button id="save" text="保存" w="*"/>
                <button id="back" text="返回" w="*"/>
            </vertical>
        </scroll>
    )
    ui.inTime.setIs24HourView(true);
    ui.offTime.setIs24HourView(true);

    if(tools.getFromDb("intime")){
        var intime=tools.getFromDb("intime");
        console.log(intime.split(":")[0])
        console.log(intime.split(":")[1])
        ui.inTime.setHour(intime.split(":")[0])
        ui.inTime.setMinute(intime.split(":")[1])
    }
    if(tools.getFromDb("offtime")){
        // ui.offTime.setHour(tools.getFromDb("offtime").split(":")[0])
        var offtime=tools.getFromDb("offtime");
        console.log(offtime.split(":")[0])
        console.log(offtime.split(":")[1])
        ui.offTime.setHour(offtime.split(":")[0])
        ui.offTime.setMinute(offtime.split(":")[1])
    }  
    
    ui.save.on("click", ()=>{
        var _in = ui.inTime.getHour()+":"+ui.inTime.getMinute();
        var off = ui.offTime.getHour()+":"+ui.offTime.getMinute();
        console.log("上班时间:"+_in);
        console.log("下班时间:"+off);
        tools.saveToDb("intime",_in)
        tools.saveToDb("offtime",off)
       
    });
    ui.back.on("click",()=>{

        begin();
    })
}

function begin(){
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <text text="打卡倒计时：" textColor="black" textSize="16sp" marginTop="16"/>
                <text text="5分10秒" textColor="black" textSize="16sp" marginTop="16"/>
                <text  bg="#ff0000" text="wfwefwef" gravity="center" textSize="25sp" />
                <horizontal>
                    <button w="150" text="第一个按钮" />
                    <button w="*" text="第二个按钮"/>
                </horizontal>
                <button id="start" text="开始执行" w="*"/>
                <button id="start" text="停止执行" w="*"/>
                <button id="setTime" text="设置上下班时间" w="*"/>
            </vertical>
        </scroll>
    )
    ui.setTime.on("click", ()=>{
        
        setTime()
    });
    ui.start.on("click", ()=>{
        
        tools.log("开始执行打卡任务");
    });
}


const tbName="dingding";
var tools={
     saveToDb:function(key,val,tb){
        if(!tb){
          tb=tbName;
        }
        var storage = storages.create(tb);
        storage = storages.create(tb);
        storage.put(key,val);
      },
      getFromDb:function(key,tb){
        if(!tb){
            tb=tbName;
          }
        var storage = storages.create(tb);
        return storage.get(key);
      },
      log(msg){
            console.log(msg)
      }
}
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "H+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

begin();