// 指定 dom
const areaList = document.querySelector('.areaList');
const areaName = document.querySelector('.areaName');
const areaWrap = document.querySelector('.areaWrap');
const hotTag = document.querySelector('.hotTag');
const btnGoTop = document.querySelector('.btn_goTop');

document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = window.scrollY;
    if (lastKnownScrollPosition > 800){
        btnGoTop.style.display = 'block';
    } else if(lastKnownScrollPosition < 800){
        btnGoTop.style.display = 'none';
    }
});

// 撈出資料
const xhr = new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
xhr.send();
xhr.onload = function(){
    let dataAr = JSON.parse(xhr.responseText);
    let dataRoute = dataAr.result.records;

    //event
    areaList.addEventListener('change',selecArea);
    hotTag.addEventListener('click',showHotTag);

    function init(){
        // 初始
        let area = [];
        for (let i = 0; i < dataRoute.length; i++) {
            area.push(dataRoute[i].Zone);
        }
        
        //去除重複的值
        let getZone = area.filter(function(element, index, arr){
            return arr.indexOf(element) === index;
        });
        
        //放入選單
        for (let i = 0; i < getZone.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', getZone[i]);
            option.textContent = getZone[i];
            areaList.appendChild(option);
        }

        //載入全部資料
        areaName.innerHTML = '所有行政區';
        renderData(dataRoute);
    }
    init();

    // 更新區域資料
    function selecArea(e){
        let value = e.target.value;
        let getData = [];
        // 行政區標題
        //title.textContent = value;
        if (value == '請選擇行政區' || !value) {
            getData = dataRoute;
            areaName.innerHTML = '所有行政區';
        } else {
            //過濾出 value 的陣列
            getData = value === 'all' ? dataRoute : dataRoute.filter(item => item.Zone === value);
            areaName.innerHTML = value;
        }
        renderData(getData);
    }

    function renderData(value){
        let areaInfoLi = '';
        for (let i = 0; i < value.length; i++) {
            //取出所有內容顯示在 areaWrap
            let infoName = value[i].Name;
            let infoOpentime = value[i].Opentime;
            let infoAdd = value[i].Add;
            let infoTel = value[i].Tel;
            let infoTicketinfo = value[i].Ticketinfo;
            let infoPicture1 = value[i].Picture1;
            let ticketStr = '';

            //字數限制, 隱藏無內容
            let omit = '...';
            if (infoOpentime.length > 30){
                infoOpentime = infoOpentime.substr(0, 30) + omit;
            } else if (infoAdd.length > 30){
                infoAdd = infoAdd.substr(0, 30) + omit;
            } else if (infoTicketinfo !== ''){
                ticketStr = '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>'
            } else if (infoTicketinfo === ''){
                ticketStr = '</span><span class="ticket hide">' + infoTicketinfo + '</span></div></li>'
            }

            if (infoTicketinfo.length > 8){
                infoTicketinfo = '歡迎來電諮詢';
                ticketStr = '</span><span class="ticket">' + infoTicketinfo + '</span></div></li>'
            } 

            //放入 areaWrap 內容
            let content = `<li data-num=${i} class="areaInfo"><div class="img"><img src="${infoPicture1}"><h4>${infoName}</h4></div><div class="content"><span class="time">${infoOpentime}</span><span class="add">${infoAdd}</span><span class="tel">${infoTel}${ticketStr}</div></li>`;
            areaInfoLi += content;
        }
        areaWrap.innerHTML = areaInfoLi;
    }

    function showHotTag(e){
        let value = e.target.innerHTML;
        let getData = [];
        if(e.target.tagName !== 'LI'){return};
        for (let i = 0; i < dataRoute.length; i++) {
            if (value == dataRoute[i].Zone){
                getData.push(dataRoute[i]);
            }
        }
        areaName.innerHTML = value;
        renderData(getData);
    }
}