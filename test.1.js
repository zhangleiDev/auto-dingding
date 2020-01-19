
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
           toast(msg)
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




// tools.removeFromDb("inDate")
// tools.removeFromDb("offDate")

// tools.log(tools.getFromDb("inDate"))
// tools.log(tools.getFromDb("offDate"))


function aaa(){
  let date=new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
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
          tools.log("法定假")
            return
        }
    }else{
        tools.saveToDb('workday',JSON.stringify({'day':(date.getMonth()+1)+"-"+ date.getDate(),'flag':tools.isWorkDay()}))
    }
    tools.log("不是法定假")
}

aaa();






















  