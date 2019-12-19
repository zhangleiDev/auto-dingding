

function launchDingDing(){
    
    //点亮屏幕
    device.wakeUp();
    //回到主页
    home();
    //启动app
    launchApp("钉钉");
    var pwd = id("et_pwd_login").findOne(5000);
    if(pwd){
        pwd.setText("computer");
        id("btn_next").findOne(3000).click();
    }
    
    if(text("取消").findOne(3000)){
        console.log("找到了")
        back()
    }else{
        console.log("没找到")
    }
}
launchDingDing()