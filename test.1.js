// "ui";
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
       var storage = storages.create(tb );
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
  let interval=1;
  let intime=tools.getFromDb("intime")+0;
    let offtime=tools.getFromDb("offtime")+0;
  let date=new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();


  let val = h*3600+m*60+s -(intime-interval*60);
  let msg = "";
  if(val > 0){
       console.log("***************")
       console.log(offtime+interval*60)
       console.log(h*3600+m*60+s)
       console.log((offtime+interval*60) - (h*3600+m*60+s))
  }else{
    console.log(val*-1)
  }

console.log("***************")
}
function getStringTime(val){

  let h = parseInt(val/3600);
  let m = parseInt(val%3600/60)
  let s = val%60;
  return h+"时"+m+"分"+s+"秒"

}
console.log(getStringTime(val))
// aaa();






















  