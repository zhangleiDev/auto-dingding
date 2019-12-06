
toast('Hello, Auto.js');
//暂停1秒
//sleep(1000);
// input(0,'测试自动点击')
//启动某个app
//toast(launchApp("今日头条"))
//输出应用的包名
//toast(getPackageName("今日头条"));
//app.openUrl("www.baidu.com")
//console.show()
// toastLog(app.autojs.versionName);
//设置剪切板内容
// setClip("剪贴板文本");
//getClip() 获取剪切板

setScreenMetrics(1080, 2340);

// click(984, 2184);
// console.info('发送成功');

//按压5秒
//press(934, 894, 5000)

//滑动
// swipe(800, 1827, 200,1827,300)
// sleep(1000)
// swipe(200, 1827, 800,1827,300)

//toast(launchApp("钉钉"))

console.log(device.width)
console.log(device.height)
console.log(device.broad)
console.log(device.brand)
console.log(device.model)
console.log(device.product)
console.log(device.hardware)
console.log(device.sdkInt)
console.log(device.getIMEI())
console.log(device.getBrightness())
console.log('音量:'+device.getMusicVolume())
console.log('内存:'+device.getTotalMem())

//震动1秒
//device.vibrate(1000);

//唤醒设备
//device.wakeUp()
//device.wakeUpIfNeeded()

//alert("您好");


//弹框
// var clear = confirm("要开始定时打卡吗?");
// if(clear){
//     alert("打卡成功！")
// }

// dialogs.build({
//     title: "你好",
//     content: "请问你是笨蛋吗?",
//     positive: "是的",
//     positiveColor:"red",
//     negative: "我是大笨蛋"
// }).on("positive", ()=>{
//     alert("哈哈哈笨蛋11");
// }).on("negative", ()=>{
//     alert("哈哈哈大笨蛋");
// }).show();


// 
// auto();
// //启用触摸监听
// events.observeTouch();
// //注册触摸监听器
// events.onTouch(function(p){
//     //触摸事件发生时, 打印出触摸的点的坐标
//     console.log(p.x + ", " + p.y);
// });


//POST 请求
// var url = "http://172.32.2.26:8084/a/devices/operators/nsq";

// var res = http.postJson(url, {
//     "topic":"device_account_syn", 
//     "data":{
//         "deviceIds": ["2001270"],
//         "type": 1
//     }
    
// });
// var html = res.body.string();
// console.log(html)



// back(); 
// home();
// KeyCode(8)

//点击发送按钮
//click("发送", 0)
// click("蚂蚁森林", 0)
// click("72g", 0)
// scrollUp(0)
console.log(scrollDown(0))
//click("查看更多好友", 0)

console.log(".***************************************")