
var msgBtn = text("消息").findOne(10000);
var myBtn = text("我的").findOne(10000);
console.log((msgBtn.bounds().centerX()+(myBtn.bounds().centerX()-msgBtn.bounds().centerX())/2)+"   "+myBtn.bounds().centerY())
click(540,2302)