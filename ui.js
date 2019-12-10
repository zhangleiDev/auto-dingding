"ui";

import { Utilities } from "winjs";

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
        let intime=tools.getFromDb("intime")+0;
        
        if(!isNaN(intime)){
            
            ui.inTime.setHour(parseInt(intime/3600))
            ui.inTime.setMinute(parseInt(intime%3600/60))
        }
       
        
    }
    if(tools.getFromDb("offtime")){
        // ui.offTime.setHour(tools.getFromDb("offtime").split(":")[0])
        let offtime=tools.getFromDb("offtime")+0;
        if(!isNaN(offtime)){
            ui.offTime.setHour(parseInt(offtime/3600))
            ui.offTime.setMinute(parseInt(offtime%3600/60))
        }
        
    }  
    
    ui.save.on("click", ()=>{
        
        var _in = ui.inTime.getHour()*3600+ui.inTime.getMinute()*60;
        var off = ui.offTime.getHour()*3600+ui.offTime.getMinute()*60;
        tools.log("上班时间:"+_in);
        tools.log("下班时间:"+off);
        
        tools.saveToDb("intime",_in)
        tools.saveToDb("offtime",off)
        toast("时间设置成功");
        begin();
    });
    ui.back.on("click",()=>{

        begin();
    })
}

function begin(){
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <text text="倒计时：" textColor="black" textSize="16sp" marginTop="16" textSize="30sp" />
                <text id="exeinfo" bg="#FFF8DC" text="未启动脚本" h="100" gravity="center" textSize="25sp" />
                <text id="timeMsg"  bg="#FFF8DC" text="请设置打卡时间" h="50" gravity="center" textSize="15sp" textColor="red"/>
                <button id="setTime" text="设置上下班时间" w="*"/>
                <horizontal gravity="center">
                    <button id="start" layout_weight="1" text="开始"  />
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
        }s
        let offtime=tools.getFromDb("offtime")+0;
        if(!isNaN(offtime)){
            msg+="，下班班时间："+tools.fmtStr(parseInt(offtime/3600))+':'+tools.fmtStr(parseInt(offtime%3600/60))  
        }
        if(msg){
            ui.timeMsg.setText(msg);
        }
        
    }
    ui.setTime.on("click", ()=>{
        
        setTime()
    });
    ui.stop.on("click", ()=>{
        
       if(!loopId){
            clearInterval(loopId);
       }
    });
    ui.start.on("click",()=>{
        if(!tools.getFromDb("intime") || !tools.getFromDb("offtime")){
            alert("请设置工作时间");
        }else{
            if(isNaN(tools.getFromDb("intime")) || isNaN(tools.getFromDb("offtime"))){
                alert("工作时间错误，请重新设置");
            }else{
                loopId = setInterval(function(){
                    loop();
                }, 5000);
                
            }
            
        }
        
    })

}
var loopId;
function loop(){
    let intime=tools.getFromDb("intime")+0;
    let offtime=tools.getFromDb("offtime")+0;

    let date=Date();
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let interval = 10;//提前10分钟
    
    if(h < 12){//上班
        //TODO 判断是否已经打过了卡
        let val = h*3600+m*60+s -(intime-interval*60);
        if( val > 0){
            tools.log("开始in打卡")
        }else{
            let msg = "";
            ui.exeinfo.setText(getStringTime(val))
        }
    }else{//下班
        //TODO 判断是否已经打过了卡
        let val = h*3600+m*60+s -(offtime+interval*60);
        if( val > 0){
            tools.log("开始off打卡")
        }else{
            ui.exeinfo.setText(getStringTime(val))
        }
    }
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
      },
      fmtStr(num){
         if(isNaN(num)){
             return ""
         }
         if(num+0<10){
            return "0"+num;
         }
         return num;
      }
}

begin();