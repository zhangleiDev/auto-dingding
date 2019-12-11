"ui";

function ui2(){
    ui.layout(
        <scroll>
            <vertical padding="16">
                <button id="go"  layout_weight="1" text="返回"/>
            </vertical>
        </scroll>
    )

    ui.go.on("click",()=>{
        begin()
    })
}
var pid;
function begin(){
    ui.layout(
        <scroll>
            <vertical padding="16">
        
                <horizontal gravity="center">
                    <button id="start" layout_weight="1" text="启动"  />
                    <button id="stop"  layout_weight="1" text="停止"/>
                </horizontal>
                <button id="go"  layout_weight="1" text="跳转"/>
            </vertical>
        </scroll>
    )
    
    ui.start.on("click",()=>{
        console.log(111111111)
        console.log(pid)
        if(!pid){

            pid = setInterval(function(){
                console.log("hello");
            }, 5000);

            toast("开始运行..."+pid)
        }else{

            toast("请勿重复执行"+pid)
        }

    })
    ui.stop.on("click",()=>{
        console.log("id: "+pid)
        if(pid){
            clearInterval(pid)
            pid=null;
            
        }
        toast("已经停止")
        
    })  
    ui.go.on("click",()=>{
        ui2()
    })
}

begin()

// var id = setInterval(function(){
//     toast("hello");
// }, 5000);

// setTimeout(function(){
//     clearInterval(id);
// }, 20 * 1000);