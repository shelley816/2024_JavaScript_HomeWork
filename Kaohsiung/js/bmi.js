//指定 dom
var getResule = document.querySelector('.getResule');
var showWrap = document.querySelector('.showWrap');
var data = JSON.parse(localStorage.getItem('listData')) || [];

//監聽事件
getResule.addEventListener('click', countBMI);
updateList(data);

//計算＋更新資料，並傳到 localstorage
function countBMI(e){
    e.preventDefault();
    var txtHeight = document.querySelector('.height').value;
    var txtWeight = document.querySelector('.weight').value;
    var bmi = txtWeight/((txtHeight/100)*(txtHeight/100));
    var txtBmi = bmi.toFixed(2);
    var bmiResule = '';
    if(txtBmi < 15){
        bmiResule = '嚴重消瘦'
    } else if(txtBmi > 15 && txtBmi < 16){
        bmiResule = '中度消瘦'
    } else if(txtBmi > 16 && txtBmi < 18.5){
        bmiResule = '輕度消瘦'
    } else if(txtBmi > 18.5 && txtBmi < 25){
        bmiResule = '理想'
    } else if(txtBmi > 25 && txtBmi < 30){
        bmiResule = '過重'
    } else if(txtBmi > 30 && txtBmi < 35){
        bmiResule = '輕度肥胖'
    } else if(txtBmi > 35 && txtBmi < 40){
        bmiResule = '中度肥胖'
    } else if(txtBmi > 40){
        bmiResule = '嚴重肥胖'
    };
    var record = {
        height: txtHeight,
        weight: txtWeight,
        bmi: txtBmi,
        resule: bmiResule
    };
    if(txtHeight == '' || txtWeight == ''){
        alert('請輸入身高和體重');
    } else (
        getYourBMI(record)
    )
}
function getYourBMI(e){
    data.push(e);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data))
}

//更新資料
function updateList(items){
    var newArray = items.reverse();
    var today = new Date();
    str = '';
    var len = newArray.length;
    for (var i = 0; i < len; i++) {
        str += '<li><p class="txtResule">'+ newArray[i].resule +'</p><p class="txtBmi"><span>BMI</span>'+ newArray[i].bmi +'</p><p class="txtWeight"><span>weight</span>'+ newArray[i].weight +'</p><p class="txtHeight"><span>height</span>'+ newArray[i].height +'</p><p class="recordDate">'+ (today.getMonth()+1) +'-' + today.getDate() +'-'+ today.getFullYear() +'</p></li>';
    }
    showWrap.innerHTML = str;
}