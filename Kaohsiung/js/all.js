// 指定 dom
var areaList = document.querySelector('.areaList');
var areaWrap = document.querySelector('.areaWrap');
var hotTag = document.querySelector('.hotTag');
var dataLen = data.result.records.length;

// 初始
function init(){
    // 取得選單資料及帶入所有內容
    var dataName = [];
    for (var i = 0; i < dataLen; i++) {
        //取出所有區域
        dataName.push(data.result.records[i].Zone);
        loadDated();
    }
    var newDataName = Array.from(new Set(dataName));
    
    // 放入選項
    for (var i = 0; i < newDataName.length; i++) {
        var areaNameOption = '<option>' + newDataName[i] + '</option>';
        areaList.innerHTML += areaNameOption;
    }
}
init();

//顯示資料
function loadDated(){
    var areaInfoLi = '';
    for (var i = 0; i < dataLen; i++) {
        //取出所有內容顯示在 areaWrap
        var infoName = data.result.records[i].Name;
        var infoOpentime = data.result.records[i].Opentime;
        var infoAdd = data.result.records[i].Add;
        var infoTel = data.result.records[i].Tel;
        var infoTicketinfo = data.result.records[i].Ticketinfo;
        var infoPicture1 = data.result.records[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
}

// 監聽與更新
areaList.addEventListener('change',selecArea);

// 更新區域資料
function selecArea(e){
    var getData = [];
    //取得點擊的 data 資料
    for (var i = 0; i < dataLen; i++) {
        if (e.target.value == data.result.records[i].Zone){
            getData.push(data.result.records[i]);
        } else if (e.target.value == '請選擇行政區'){return};
    }
    var areaInfoLi = '';
    for (var i = 0; i < getData.length; i++) {
        //取出所有內容顯示在 areaWrap
        var infoName = getData[i].Name;
        var infoOpentime = getData[i].Opentime;
        var infoAdd = getData[i].Add;
        var infoTel = getData[i].Tel;
        var infoTicketinfo = getData[i].Ticketinfo;
        var infoPicture1 = getData[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
}

hotTag.addEventListener('click',function(e){
    if(e.target.tagName !== 'LI'){return};
    var getData = [];
    //取得點擊的 data 資料
    for (var i = 0; i < dataLen; i++) {
        if (e.target.textContent == data.result.records[i].Zone){
            getData.push(data.result.records[i]);
        }
    }
    var areaInfoLi = '';
    for (var i = 0; i < getData.length; i++) {
        //取出所有內容顯示在 areaWrap
        var infoName = getData[i].Name;
        var infoOpentime = getData[i].Opentime;
        var infoAdd = getData[i].Add;
        var infoTel = getData[i].Tel;
        var infoTicketinfo = getData[i].Ticketinfo;
        var infoPicture1 = getData[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
})