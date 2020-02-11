/*classes*/
let url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
let city = "Kiev";
let apiKey = "a49244ade877ce6d9959e8846248bb70";
var urlByCoords;
var urlByCity;

$('#current_date').text(`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`);
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        urlByCoords = `${url}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
        FEETCH(urlByCoords).then(x => {
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
            $('#sunset').text(`Sunrise: ${formattedTimeSunset}`);
            let duration;
            if(minutes1 < minutes2){
                duration = `${hours2 - hours1}h ${minutes2 - minutes1}m`;
                $('#duration').text(`Duration: ${duration}`);
            }
            else{
                duration = `${(hours2-1) - hours1}h ${60-(minutes1 - minutes2)}m`;
                $('#duration').text(`Duration: ${duration}`);
            }
            
        });
        // urlByCity = `${url}q=${city}&appid=${apiKey}`;
        // FEETCH(urlByCoords).then(x => {
        // alert(x.status);
        // });
    });
} else {
    
}



$('#btn_find').on( "click", function() {
    urlByCity = `${url}q=${city}&appid=${apiKey}`;
    FEETCH(urlByCoords).then(x => {
        alert(x.status);
    });
});




/*
var httpRequest;
function GetResult(url){
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } 
    else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {}
        }
    }
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
    }
    httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
    httpRequest.open('GET', url, true);
    httpRequest.send('');
};
function alertContents(httpRequest) {
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			alert(httpRequest.responseText);
		} else {
			alert('There was a problem with the request.');
		}
	}
};
*/

async function FEETCH(url){
        let response = await fetch(url);
        let text = await response.json();
        return text;
}
