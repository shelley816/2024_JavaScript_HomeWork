//指定 dom
let getResule = document.querySelector('.getResule');
let recalculate = document.querySelector('.afterPress')
let showWrap = document.querySelector('.showWrap');
let textRemind = document.querySelector('.remind');
let txtResule = document.querySelector('.txtResule_top');
let txtHeight = document.getElementById('height');
let txtWeight = document.getElementById('weight');
let cssResule = document.querySelector('.btnWrap');
let initText = document.querySelector('.initText');
let deleteAllData = document.querySelector('.deleteAll');
let data = JSON.parse(localStorage.getItem('listData')) || [];

//footer
let fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
);
let conHeight = document.querySelector('.container_2');
conHeight.style.minHeight = (fullHeight-451) + 'px';


//監聽事件
getResule.addEventListener('click', countBMI);
recalculate.addEventListener('click', reCont);
showWrap.addEventListener('click', toggleDone);
updateList(data);

//計算＋更新資料
function countBMI(e){
    e.preventDefault();

    if(txtHeight.value.length === 0 || txtWeight.value.length === 0) {
        textRemind.innerHTML = '*請輸入身高、體重';
        return
    } else (
        getYourBMI(txtHeight.value, txtWeight.value)
    );

}

function getYourBMI(txtHeight, txtWeight){
    textRemind.innerHTML = '';
    getResule.style.display = 'none';
    let bmi = txtWeight/((txtHeight/100)*(txtHeight/100));
    let txtBmi = bmi.toFixed(2);

    let bmiResule = '';
    let liClass = '';

    let numResule = document.querySelector('.txtBmi');

    numResule.innerHTML = txtBmi;
    recalculate.style.display = 'block';

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

    let record = {
        height: txtHeight,
        weight: txtWeight,
        bmi: txtBmi,
        resule: bmiResule,
        cssStyle: liClass
    };
    
    data.unshift(record);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data)
}

//更新資料
function updateList(items){

    if(data == ''){
        deleteAllData.style.display = 'none';
        initText.style.display = 'block';
    } else {
        deleteAllData.style.display = 'block';
        initText.style.display = 'none';
    }

    let today = new Date();
    str = '';
    let len = items.length;
    for (let i = 0; i < len; i++) {
        str += '<li class="listInfo"><p class="txtResule ' + items[i].cssStyle + '">'+ items[i].resule +'</p><p class="txtBmi"><span>BMI</span>'+ items[i].bmi +'</p><p class="txtWeight"><span>weight</span>'+ items[i].weight + 'kg</p><p class="txtHeight"><span>height</span>'+ items[i].height +'cm</p><p class="recordDate">'+ (today.getMonth()+1) +'-' + today.getDate() +'-'+ today.getFullYear() +'</p><a href="#" data-num="' + i + '" class="delete" href=""></a></li>';
    }
    showWrap.innerHTML = str;
}

function reCont(){
    getResule.style.display = 'block';
    recalculate.style.display = 'none';
    txtResule.innerHTML = '';
    txtHeight.value = '';
    txtWeight.value = '';
    cssResule.setAttribute('class','btnWrap');
}

function toggleDone(e){
    e.preventDefault();
    if(e.target.tagName !== 'A'){return};
    var num = e.target.dataset.num;
    data.splice(num, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

deleteAllData.addEventListener('click', function(e){
    e.preventDefault();
    data = [];
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
    reCont();
})