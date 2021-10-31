const loadData = async(city,zipcode) =>{
    const weather = await getData(city,zipcode);
    console.log(weather)
    loadTableData(weather)
};

const APIkey = '2bc99c40d1abb4037447c31bca684861';

const getData = async (city,zipcode) =>{
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&zip=${zipcode}&appid=${APIkey}`);
    console.log(response.data)
    return response.data
};

let form = document.querySelector('#dataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let query_city = document.querySelector('#city');
    let query_zipcode = document.querySelector('#zipCode');
    console.log(query_city.value,query_zipcode.value);
    loadData(query_city.value,query_zipcode.value);
    query_city.value = '';
    query_zipcode.value = '';
}); 


function deleteTable(table){
    if(table.rows.length >= 2){
        table.deleteRow(1);
    }    
};

function loadTableData(item) {
    imageName(item)
    let name = document.getElementById("cityName");
    name.innerHTML = item.name
    let table = document.getElementById("highTemp");
    deleteTable(table)
    let row = table.insertRow();
    let high = row.insertCell(0);
    high.innerHTML = `${((item.main.temp_max - 273.15) * 9/5 + 32).toFixed(2)}&deg;F`;
    table = document.getElementById("lowTemp");
    deleteTable(table)
    row = table.insertRow();
    low = row.insertCell(0);
    low.innerHTML = `${((item.main.temp_min - 273.15) * 9/5 + 32).toFixed(2)}&deg;F`;
    table = document.getElementById("forecast");
    deleteTable(table)
    row = table.insertRow();
    forecast = row.insertCell(0);
    forecast.innerHTML = item.weather[0].main;
    table = document.getElementById("humidity");
    deleteTable(table)
    row = table.insertRow();
    humidity = row.insertCell(0);
    humidity.innerHTML = `${item.main.humidity}%`;
};

function imageName(main) {
    if(main.weather[0].main == 'Thunderstorm'){
        main = document.getElementById("bg").style.backgroundImage = "url('images/thunderstorm.jpeg')";
    }
    else if(main.weather[0].main == 'Drizzle' || main.weather[0].main == 'Rain'){
        main = document.getElementById("bg").style.backgroundImage = "url('images/rain.jpeg')";
    }
    else if(main.weather[0].main == 'Snow'){
        main = document.getElementById("bg").style.backgroundImage = "url('images/snow.jpeg')";
    }
    else if(main.weather[0].main == 'Clear'){
        main = document.getElementById("bg").style.backgroundImage = "url('images/sunny.jpeg')";
    }
    else if(main.weather[0].main == 'Clouds'){
        main = document.getElementById("bg").style.backgroundImage = "url('images/cloud.jpeg')";
    }
    else{
        main = document.getElementById("bg").style.backgroundImage = "url('images/fog.png')";
    }
};





