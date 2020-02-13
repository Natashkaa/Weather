var Data = {
    urlTodayCoords : "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?",
    urlForecastTodayCoords : "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?",
    defaultCity : "Kiev",
    apiKey : "a49244ade877ce6d9959e8846248bb70",
    forecastArray : [,,,,,],
    fullWeatherArray : "",
    weekDayArray : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    monthArray : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SET", "OCT", "NOV", "DEC"],
    getUrlTodayCoords : function(lat, lon){
        return `${this.urlTodayCoords}lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    },
    getUrlTodayCity : function(city){
        return `${this.urlTodayCoords}q=${city}&appid=${this.apiKey}`;
    },
    getUrlForecastTodayCoords : function(lat, lon){
        return `${this.urlForecastTodayCoords}lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    },
    getUrlForecastTodayCity : function(city){
        return `${this.urlForecastTodayCoords}q=${city}&appid=${this.apiKey}`;
    }
}

var data = Object.create(Data);

function SetCurrentWeather(x){
    $('#weather_main').text(x.weather[0].main);
    $('#current_weather_img').attr("src", `../Source/${x.weather[0].icon}.png`);
    $('#current_temperature').text(`${x.main.temp-273,15}°C`);
    $('#current_pressure').text(`Pressure: ${(x.main.pressure/1.333).toFixed(0)}`);
    let unix_timestampSunrise = x.sys.sunrise;
    let dateSunrise = new Date(unix_timestampSunrise * 1000);
    let hours1 = dateSunrise.getHours();
    let minutes1 = dateSunrise.getMinutes();
    var formattedTimeSunrise = hours1 + ':' + minutes1;
    
    let unix_timestampSunset = x.sys.sunset;
    let dateSunset = new Date(unix_timestampSunset * 1000);
    let hours2 = dateSunset.getHours();
    let minutes2 = dateSunset.getMinutes();
    var formattedTimeSunset= hours2 + ':' + minutes2;
    $('#sunrise').text(`Sunrise: ${formattedTimeSunrise}`);
    $('#sunset').text(`Sunset: ${formattedTimeSunset}`);
    let duration;
    if(minutes1 < minutes2){
        duration = `${hours2 - hours1}h ${minutes2 - minutes1}m`;
        $('#duration').text(`Duration: ${duration}`);
    }
    else{
        duration = `${(hours2-1) - hours1}h ${60-(minutes1 - minutes2)}m`;
        $('#duration').text(`Duration: ${duration}`);
    }
    $('#inp_city').val(`${x.name}, ${x.sys.country}`);
}

function SetForecastTodayTable(x){
    fullWeatherArray = x;
    let index = 0;
    $('.th-time').each(function( ) {
        let time;
        let date = new Date(x.list[index++].dt * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(hours < 10) time = '0' + hours;
        else time = hours;
        if(minutes < 10) time += ':0' + minutes;
        else time += ':' + minutes;
        $(this).text(time);
    });
    index = 0;
    $('.table-img').each(function( ) {
       $(this).attr("src", `../Source/${x.list[index++].weather[0].icon}.png`);
    });
    index = 0;
    $('.main').each(function( ) {
        $(this).text(`${x.list[index++].weather[0].main}`);
    });
    index = 0;
    $('.temperature').each(function( ) {
        $(this).text(`${x.list[index++].main.temp-273,15}°C`);
    });
    index = 0;
    $('.pressure').each(function( ) {
        $(this).text(`${(x.list[index++].main.pressure/1.333).toFixed(0)}`);
    });
    index = 0;
    $('.wind').each(function( ) {
        $(this).text(`${(x.list[index++].wind.speed).toFixed(0)}m/s`);
    });
}
//back current weather day
function BackForecastTable(){
    let index = 0;
    $('.th-time').each(function( ) {
        let time;
        let date = new Date(fullWeatherArray.list[index++].dt * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(hours < 10) time = '0' + hours;
        else time = hours;
        if(minutes < 10) time += ':0' + minutes;
        else time += ':' + minutes;
        $(this).text(time);
    });
    index = 0;
    $('.table-img').each(function( ) {
       $(this).attr("src", `../Source/${fullWeatherArray.list[index++].weather[0].icon}.png`);
    });
    index = 0;
    $('.main').each(function( ) {
        $(this).text(`${fullWeatherArray.list[index++].weather[0].main}`);
    });
    index = 0;
    $('.temperature').each(function( ) {
        $(this).text(`${fullWeatherArray.list[index++].main.temp-273,15}°C`);
    });
    index = 0;
    $('.pressure').each(function( ) {
        $(this).text(`${(fullWeatherArray.list[index++].main.pressure/1.333).toFixed(0)}`);
    });
    index = 0;
    $('.wind').each(function( ) {
        $(this).text(`${(fullWeatherArray.list[index++].wind.speed).toFixed(0)}m/s`);
    });
}
//set table by index of block
function SetForecastTodayTableByInd(ind){
    let index = findIndex(data.forecastArray[ind].dt);
    let tmpInd = index;
    $('.th-time').each(function( ) {
        let time;
        let date = new Date(fullWeatherArray.list[index++].dt * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(hours < 10) time = '0' + hours;
        else time = hours;
        if(minutes < 10) time += ':0' + minutes;
        else time += ':' + minutes;
        $(this).text(time);
    });
    index = tmpInd;
    $('.table-img').each(function( ) {
       $(this).attr("src", `../Source/${fullWeatherArray.list[index++].weather[0].icon}.png`);
    });
    index = tmpInd;
    $('.main').each(function( ) {
        $(this).text(`${fullWeatherArray.list[index++].weather[0].main}`);
    });
    index = tmpInd;
    $('.temperature').each(function( ) {
        $(this).text(`${fullWeatherArray.list[index++].main.temp-273,15}°C`);
    });
    index = tmpInd;
    $('.pressure').each(function( ) {
        $(this).text(`${(fullWeatherArray.list[index++].main.pressure/1.333).toFixed(0)}`);
    });
    index = tmpInd;
    $('.wind').each(function( ) {
        $(this).text(`${(fullWeatherArray.list[ind++].wind.speed).toFixed(0)}m/s`);
    });
}
//add 5 days in array
function FillForecastArray(x){
    data.forecastArray[0] = x.list[0];
    let newDt = data.forecastArray[0].dt + 86400;
    let ind = 1;
    Array.from(x.list).forEach(element => {
        if(element.dt == newDt){
            data.forecastArray[ind++] = element;
            newDt += 86400;
            if(ind > 4) return;
        }
    });
    FillForecastBlocks();
}

function FillForecastBlocks(){
    let ind = 0;
    $('.week-day').each(function( ) {
        let date = new Date(data.forecastArray[ind++].dt * 1000);
        let weekDay = date.getDay();
        $(this).text(data.weekDayArray[weekDay]);
    });
    ind = 0;
    $('.monthAndday').each(function( ) {
        let date = new Date(data.forecastArray[ind++].dt * 1000);
        let month = date.getMonth();
        let day = date.getDate();
        let res;
        if(day < 10) res = `${data.monthArray[month]} 0${day}`;
        else res = `${data.monthArray[month]} ${day}`;
        $(this).text(res);
    });
    ind = 0;
    $('.forecast-img').each(function( ) {
        $(this).attr("src", `../Source/${data.forecastArray[ind++].weather[0].icon}.png`);
    });
    ind = 0;
    $('.forecast-temp').each(function( ) {
        $(this).text(`${data.forecastArray[ind++].main.temp-273,15}°C`);
    });
    ind = 0;
    $('.forecast-main').each(function( ) {
        $(this).text(`${data.forecastArray[ind++].weather[0].main}`);
    });
}

function findIndex(dt){
    for(let i = 0; i < fullWeatherArray.list.length; i++){
        if(fullWeatherArray.list[i].dt == dt) return i;
    }
}

async function FEETCH(url){
    let response = await fetch(url);
    let text = await response.json();
    return text;
}