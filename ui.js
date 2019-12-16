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
        
        setTime()
    });
    ui.stop.on("click", ()=>{
        
       if(loopId){
            clearInterval(loopId);
            loopId=null;
       }
       ui.exeinfo.setText("未启动脚本");
       toast("停止执行")
    });
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
        
    })

}
var loopId;
var interval = random(2, 10);//提前10分钟
function loop(){

    let intime=tools.getFromDb("intime")+0;
    let offtime=tools.getFromDb("offtime")+0;

    let date=new Date();
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    //console.log()
    if(h < 12){//上班
        //是否已经打过了卡
        if(tools.getFromDb("inDate") == tools.getToDay()){
            return;
        }

        let val = h*3600+m*60+s -(intime-interval*60);
        if( val > 0){
            if(intime>h*3600+m*60+s-120){//冗余2分钟，迟到2分钟内尝试重复打卡
                console.log(val)
                tools.log("开始in打卡")
            }
            
        }else{
            let msg = "";
            ui.exeinfo.setText(getStringTime(val*-1))
        }
    }else{//下班
        // 判断是否已经打过了卡
        if(tools.getFromDb("offDate") == tools.getToDay()){
            return;
        }
        let val = h*3600+m*60+s -(offtime+interval*60);
        if( val > 0 && val < 180){//再次冗余3分钟，重新尝试打卡


            tools.log("开始off打卡")
        }else{
            ui.exeinfo.setText(getStringTime(val*-1))
            interval = random(2, 10);//提前10分钟
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
     getToDay:function(){
        return new Date().getMonth()+"-"+new Date().getDate()
     },
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