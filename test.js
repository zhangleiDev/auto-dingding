"ui";
ui.layout(
    <vertical>
        <button id="bt1"  text="第一个按钮"/>
    </vertical>
);
ui.bt1.on("click", ()=>{
    runThread(()=>{

        let r = launchDingDing()
        // tools.log("模拟点击  ")
        // runThread(()=>{
        //     click(540, 2302)
        // })
    
        tools.log("rrrrrrrrrrr  " +r)
    })
    

 });
 
 function runThread(fun){
    var t=threads.start(function(){
        //在新线程执行的代码
        fun();//卡死
    });
    return t;
 }
// var msgBtn = text("消息").findOne(10000);
    // var myBtn = text("我的").findOne(10000);
    // tools.log((msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2)+"   "+myBtn.bounds().centerY())
    // // r = click(msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2, myBtn.bounds().centerY())
    // id("home_bottom_tab_icon_group")
    // tools.log("r==========="+r)

tools={
    log(msg){
        console.log(msg)
    }
}



function launchDingDing(){
    tools.log("启动dingding")
    // //点亮屏幕
    // device.wakeUp();
    // //回到主页
    // home();
    //启动app
    launchApp("钉钉");
    var pwd = id("et_pwd_login").findOne(5000);
    tools.log("密码  "+pwd)
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
        return false;
    }
    return true;
}












