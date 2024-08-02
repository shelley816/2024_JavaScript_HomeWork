//指定 dom
var getResule = document.querySelector('.getResule');
var showWrap = document.querySelector('.showWrap');
var data = JSON.parse(localStorage.getItem('listData')) || [];

//footer
var fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
);
var conHeight = document.querySelector('.container_2');
conHeight.style.minHeight = (fullHeight-451) + 'px';


//監聽事件
getResule.addEventListener('click', countBMI);
updateList(data);

//計算＋更新資料，並傳到 localstorage
function countBMI(e){
    e.preventDefault();
    var txtHeight = document.getElementById('height').value;
    var txtWeight = document.getElementById('weight').value;
    var bmi = txtWeight/((txtHeight/100)*(txtHeight/100));
    var txtBmi = bmi.toFixed(2);
    var bmiResule = '';
    var liClass = '';
    
    var cssResule = document.querySelector('.btnWrap');
    var txtResule = document.querySelector('.txtResule_top');
    getResule.classList.add('afterPress');
    cssResule.setAttribute('class','btnWrap');
    getResule.value = '';
    
    if(txtBmi < 18.5){
        bmiResule = '過輕';
        liClass = 'blue';
        cssResule.classList.add('thin_blue');
        txtResule.style.color = '#31BAF9'
    } else if(txtBmi > 18.5 && txtBmi < 25){
        bmiResule = '理想';
        liClass = 'green';
        cssResule.classList.add('ideal_green');
        txtResule.style.color = '#86D73E'
    } else if(txtBmi >= 25 && txtBmi < 30){
        bmiResule = '過重';
        liClass = 'lightOrange';
        cssResule.classList.add('heavy_lightOrange');
        txtResule.style.color = '#FF982D'
    } else if(txtBmi >= 30 && txtBmi < 35){
        bmiResule = '輕度肥胖';
        liClass = 'orange';
        cssResule.classList.add('heavy_orange');
        txtResule.style.color = '#FF6C02'
    } else if(txtBmi >= 35 && txtBmi < 40){
        bmiResule = '中度肥胖';
        liClass = 'orange';
        cssResule.classList.add('heavy_orange');
        txtResule.style.color = '#FF6C02'
    } else if(txtBmi >= 40){
        bmiResule = '嚴重肥胖';
        liClass = 'red';
        cssResule.classList.add('heavy_red');
        txtResule.style.color = '#FF1200'
    };

    txtResule.innerHTML = bmiResule;

    var record = {
        height: txtHeight,
        weight: txtWeight,
        bmi: txtBmi,
        resule: bmiResule,
        cssStyle: liClass
    };

    if(txtHeight == '' || txtWeight == ''){
        alert('請輸入身高和體重');
        getResule.setAttribute('class', 'getResule');
        getResule.value = '看結果'
    } else (
        getYourBMI(record)
    )

}

function getYourBMI(e){
    data.unshift(e);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data)
}

//更新資料
function updateList(items){
    var today = new Date();
    str = '';
    var len = items.length;
    for (var i = 0; i < len; i++) {
        str += '<li class="listInfo"><p class="txtResule ' + items[i].cssStyle + '">'+ items[i].resule +'</p><p class="txtBmi"><span>BMI</span>'+ items[i].bmi +'</p><p class="txtWeight"><span>weight</span>'+ items[i].weight + 'kg</p><p class="txtHeight"><span>height</span>'+ items[i].height +'cm</p><p class="recordDate">'+ (today.getMonth()+1) +'-' + today.getDate() +'-'+ today.getFullYear() +'</p></li>';
    }
    showWrap.innerHTML = str;
}