

// back(); 
// home();
// // click("支付宝", 0)
// launchApp("支付宝")
// sleep(5000)
// click("黑科技", 0)
// setText("测试",0)
// click("发送", 0)


//点击发送按钮
//click("发送", 0)
// click("蚂蚁森林", 0)
// click("72g", 0)
// scrollUp(0)
//滑动成功返回true，失败返回false
// console.log("向下滑动： "+scrollDown(0))
//click("查看更多好友", 0)


// home();
// launchApp("支付宝")
// sleep(5000)
// click("蚂蚁森林", 0)

// var btn = textStartsWith("收集能量").find().click();
// console.log(btn)




/**
 * 点击可以收取的能量
 */
function clickEnergyCircle(){
    textStartsWith("收集能量").find().forEach(function(pos){
        var posb=pos.bounds();
        //点击坐标中心
        click(posb.centerX(),posb.centerY());
        sleep(1000)
    })
}

//clickEnergyCircle()


// //请求横屏截图
requestScreenCapture(true);
//截图
var img = captureScreen();
//获取在点(100, 100)的颜色值1039 y: 1177
var color = images.pixel(img,1046,1892);
//显示该颜色值
toast(colors.toString(color));



var friends = textEndsWith("g").find();

// for (let i = 0; i < friends.length; i++) {
//     var f = friends[i];
//     if(i<10){
//         log("能量值"+f.text()+" x: "+f.bounds().right+" y: "+f.bounds().top);
//         sleep(500)
//     }
    
// }




console.log(".***************************************")


function log(msg){
    console.log("msg:" + msg)
};