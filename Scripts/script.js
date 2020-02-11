/*classes*/
let url = "https://samples.openweathermap.org/data/2.5/weather?";
let apiKey = "a49244ade877ce6d9959e8846248bb70";
var urlByCoords;

if ("geolocation" in navigator) {
    /* геолокация доступна */
    navigator.geolocation.getCurrentPosition(function(position) {
        urlByCoords = `${url}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
        fetch("https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22", {
            method: 'GET',
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/html',
                'Accept-Language': 'zh-CN',
            }
             // include, *same-origin, omit
            //headers: {
            //'Content-Type': 'application/json',
             //'Content-Type': 'application/x-www-form-urlencoded'
        //}
        }).then(r => r.text())
             .then(commits => alert(commits));

    });
} else {
    /* геолокация НЕдоступна */
}


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
        //return false;
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

async function FEETCH(url){
    // fetch(url,{
    //     method: 'GET',
    //     mode: 'no-cors', // no-cors, cors, *same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     }})
    //     .then(response => response.text())
    //     .then(commits => alert(commits[0]));

        // if(response.ok){
        //     alert(response);
        //     let commits = await response.json(); // читаем ответ в формате JSON
        //     alert(commits[0]);
        // }else {
        //     alert("Ошибка HTTP: " + response.status);
        //   }
        
        let response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin' // include, *same-origin, omit
            //headers: {
            //'Content-Type': 'application/json',
             //'Content-Type': 'application/x-www-form-urlencoded'
        //}
        });

        let text = await response.text();
        alert(text); // прочитать тело ответа как текс



    
}

