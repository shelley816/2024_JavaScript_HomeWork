// 指定 dom
var areaList = document.querySelector('.areaList');
var areaWrap = document.querySelector('.areaWrap');
var hotTag = document.querySelector('.hotTag');
var dataRoute = data.result.records;

// 初始
var area = [];
for (var i = 0; i < dataRoute.length; i++) {
    area.push(dataRoute[i].Zone);
}
//去除重複的值
var getZone = area.filter(function(element, index, arr){
    return arr.indexOf(element) === index;
});
//放入選單
for (var i = 0; i < getZone.length; i++) {
    var option = document.createElement('option');
    option.setAttribute('value', getZone[i]);
    option.textContent = getZone[i];
    areaList.appendChild(option);
}

//過濾資料
function filterData(value) {
}

// 更新區域資料
function selecArea(e){
    var value = e.target.value;
    var getData = [];
    // 行政區標題
    //title.textContent = value;
    if (value == '請選擇行政區' || !value) {
        getData = area;
    } else {
        getData = area.filter(function(element, index, arr){
            return value == element;
        });
    }
    renderData(getData);
}

areaList.addEventListener('change',selecArea);

function renderData(value){
    console.log(value);
    var areaInfoLi = '';
    for (var i = 0; i < value.length; i++) {
        //取出所有內容顯示在 areaWrap
        var infoName = dataRoute[i].Name;
        var infoOpentime = dataRoute[i].Opentime;
        var infoAdd = dataRoute[i].Add;
        var infoTel = dataRoute[i].Tel;
        var infoTicketinfo = dataRoute[i].Ticketinfo;
        var infoPicture1 = dataRoute[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
}

// hotTag.addEventListener('click',function(e){
//     if(e.target.tagName !== 'LI'){return};
//     var getData = [];
//     //取得點擊的 data 資料
//     for (var i = 0; i < dataLen; i++) {
//         if (e.target.textContent == data.result.records[i].Zone){
//             getData.push(data.result.records[i]);
//         }
//     }
//     var areaInfoLi = '';
//     for (var i = 0; i < getData.length; i++) {
//         //取出所有內容顯示在 areaWrap
//         var infoName = getData[i].Name;
//         var infoOpentime = getData[i].Opentime;
//         var infoAdd = getData[i].Add;
//         var infoTel = getData[i].Tel;
//         var infoTicketinfo = getData[i].Ticketinfo;
//         var infoPicture1 = getData[i].Picture1;

//         //放入 areaWrap 內容
//         var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
//         areaInfoLi += content;
//     }
//     areaWrap.innerHTML = areaInfoLi;
// })