var storage = storages.create("dingding");
storage.put("inTime", 123);
storage.put("offTime", 123);


if(storage.contains("inTime")){
    console.log(storage.get("inTime"))
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
function stringToDate(str){

    var tempStrs = str.split(" ");

    var dateStrs = tempStrs[0].split("-");

    var year = parseInt(dateStrs[0], 10);

    var month = parseInt(dateStrs[1], 10) - 1;

    var day = parseInt(dateStrs[2], 10);

    var timeStrs = tempStrs[1].split(":");

    var hour = parseInt(timeStrs [0], 10);

    var minute = parseInt(timeStrs[1], 10);

    var second = parseInt(timeStrs[2], 10);

    var date = new Date(year, month, day, hour, minute, second);

    return date;

}

var current = new Date();
console.log(stringToDate(current.Format("yyyy-MM-dd")+" 09:00:00").Format("yyyy-MM-dd HH:mm:ss"))

console.log(current.getTime())