var Data = {
    urlTodayCoords : "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?",
    defaultCity : "Kiev",
    apiKey : "a49244ade877ce6d9959e8846248bb70",
    getUrlTodayCoords : function(lat, lon){
        return `${this.urlTodayCoords}lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    },
    getUrlTodayCity : function(city){
        return `${this.urlTodayCoords}q=${city}&appid=${this.apiKey}`;
    }
}
var data = Object.create(Data);
function SetData(x){
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
}