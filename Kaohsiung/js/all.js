// 指定 dom
var areaList = document.querySelector('.areaList');
var areaWrap = document.querySelector('.areaWrap');
var hotTag = document.querySelector('.hotTag');
var dataRoute = data.result.records;

function init(){
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

    //載入全部資料
    renderData(dataRoute);
}
init();

// 更新區域資料
function selecArea(e){
    var value = e.target.value;
    var getData = [];
    // 行政區標題
    //title.textContent = value;
    if (value == '請選擇行政區' || !value) {
        getData = dataRoute;
    } else {
        for (var i = 0; i < dataRoute.length; i++) {
            if (value == dataRoute[i].Zone){
                getData.push(dataRoute[i]);
            }
        }
    }
    renderData(getData);
}

function renderData(value){
    var areaInfoLi = '';
    for (var i = 0; i < value.length; i++) {
        //取出所有內容顯示在 areaWrap
        var infoName = value[i].Name;
        var infoOpentime = value[i].Opentime;
        var infoAdd = value[i].Add;
        var infoTel = value[i].Tel;
        var infoTicketinfo = value[i].Ticketinfo;
        var infoPicture1 = value[i].Picture1;

        //放入 areaWrap 內容
        var content = '<li data-num=' + i + ' class="areaInfo"><img src="' + infoPicture1 + '"><h4>' + infoName + '</h4><div><span class="time">' + infoOpentime + '</span><span class="add">' + infoAdd + '</span><span class="tel">' + infoTel + '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>';
        areaInfoLi += content;
    }
    areaWrap.innerHTML = areaInfoLi;
}

areaList.addEventListener('change',selecArea);

hotTag.addEventListener('click',function(e){
    var value = e.target.innerHTML;
    var getData = [];
    if(e.target.tagName !== 'LI'){return};
    for (var i = 0; i < dataRoute.length; i++) {
        if (value == dataRoute[i].Zone){
            getData.push(dataRoute[i]);
        }
    }
    renderData(getData);
})