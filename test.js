

function launchDingDing(){
    
    //点亮屏幕
    device.wakeUp();
    //回到主页
    home();
    //启动app
    launchApp("钉钉");
    var pwd = id("et_pwd_login").findOne(3000);
    if(pwd){
        pwd.setText("computer");
        id("btn_next").findOne(3000).click();
    }
    
    console.log("11111111111111")
    if(!id("img_logo_text").findOne(3000)){
        console.log("back")
        back()
    }
    console.log("222222222222222")
}
console.log("----------------33333333----------")
launchDingDing()

console.log("--------------------------")
