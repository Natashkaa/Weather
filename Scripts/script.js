window.onload = function() {
    $('#btn_today').addClass('active-btn');
    $('#current_date').text(`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`);
    if ("geolocation" in navigator)/*search by coords*/  {
        navigator.geolocation.getCurrentPosition(function(position) {
            FEETCH(data.getUrlTodayCoords(position.coords.latitude, position.coords.longitude)).then(x => {
                SetData(x);
            });
        });
    } else {//search by city
        urlByCity = `${url}q=${city}&appid=${apiKey}`;
        FEETCH(data.getUrlTodayCity(data.defaultCity)).then(x => {
            SetData(x);
        });
    }
};

$('#btn_find').on( "click", function() {
    let userCity = $('#inp_city').val();
        FEETCH(data.getUrlTodayCity(userCity)).then(x => {
            if(x.cod != 200){
                $('#error_row').css({"display":"block"});
                $('.error-descr').text(`${userCity} could not be found. Please try enter a different location.`);
                $('.show-weather').css({"display":"none"});
            }
            else{
            $('#error_row').css({"display":"none"});
            $('.show-weather').css({"display":"block"});

            SetData(x);
            }
        });
});
$('#btn_5day').on( "click", function() {
    $('#btn_today').removeClass('active-btn');
    $(this).addClass('active-btn');
    if($('#error_row').css('display') == "none"){
        $('.show-weather').css({"display":"none"})
    }
    
});
$('#btn_today').on( "click", function() {
    $('#btn_5day').removeClass('active-btn');
    $(this).addClass('active-btn');
    if($('#error_row').css('display') == "none"){
        $('.show-weather').css({"display":"block"})
    }
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
