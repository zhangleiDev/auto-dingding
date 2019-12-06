"ui";
ui.layout(
    <scroll>
        <vertical padding="16">
    
            <text text="滑动时间选择" textColor="black" textSize="16sp" marginTop="16"/>
            <timepicker id="inTime" timePickerMode="spinner"/>
            <button id="save" text="保存" w="*"/>

        </vertical>
    </scroll>
)

ui.inTime.setIs24HourView(true);
ui.inTime.setHour(8)
ui.inTime.setMinute(55)

ui.save.on("click", ()=>{
    console.log("时间:"+ui.inTime.getHour()+" : "+ui.inTime.getMinute())
});