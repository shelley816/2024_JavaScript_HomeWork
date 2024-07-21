// 指定 dom
var areaList = document.querySelector('.areaList');
var areaWrap = document.querySelector('.areaWrap');
var dataLen = data.result.records.length;

// 初始
function init(){
    // 取得選單資料及帶入所有內容
    var dataName = [];
    var areaInfoLi = '';
    for (var i = 0; i < dataLen; i++) {
        //取出所有區域
        dataName.push(data.result.records[i].Zone);

        //取出所有內容顯示在 areaWrap
        var infoName = data.result.records[i].Name;
        var infoOpentime = data.result.records[i].Opentime;
        var infoAdd = data.result.records[i].Add;
        var infoTel = data.result.records[i].Tel;
        var infoTicketinfo = data.result.records[i].Ticketinfo;
        var infoPicture1 = data.result.records[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
    var newDataName = Array.from(new Set(dataName));

    //取出同區域有多少
    var collectionRepeat = function(box, key){
        var counter = {};
        box.forEach(function(x) { 
            counter[x] = (counter[x] || 0) + 1; 
        });
        var val = counter[key];
        if (key === undefined) {
            return counter;
        }
        return (val) === undefined ? 0 : val;
    }

    // 放入選項
    for (var i = 0; i < newDataName.length; i++) {
        var areaNameOption = '<option data-count="' + collectionRepeat(dataName, newDataName[i]) + '">' + newDataName[i] + '</option>';
        areaList.innerHTML += areaNameOption;
    }
}
init();

// 監聽與更新
areaList.addEventListener('change',selecArea);

// 更新區域資料
function selecArea(e){
    var areaInfoLi = '';
    for (var i = 0; i < dataLen; i++) {
        if (e.target.value == data.result.records[i].Zone) {
            //取出所有內容顯示在 areaWrap
            var infoName = data.result.records[i].Name;
            var infoOpentime = data.result.records[i].Opentime;
            var infoAdd = data.result.records[i].Add;
            var infoTel = data.result.records[i].Tel;
            var infoTicketinfo = data.result.records[i].Ticketinfo;
            var infoPicture1 = data.result.records[i].Picture1;
        
            //放入 areaWrap 內容
            var content = '<li class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
            areaInfoLi += content;
        };
    }
    areaWrap.innerHTML = areaInfoLi;
}

// 想把重複的資料整理在這，但寫不出來
function updateList(){

    console.log(newDataName)
    console.log(collectionRepeat(dataName))

    console.log(e.target.value);
    //value 等於 滑鼠點擊 + 等於 newDataName 並取出數值
}
