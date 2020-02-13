window.onload = function() {
    $('#btn_today').addClass('active-btn');
    $('.forecast-table').css({"display":"block"});
    $('.forecast-blocks-container').css({"display":"none"});
    $('#current_date').text(`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`);
    if ("geolocation" in navigator)/*search by coords*/  {
        navigator.geolocation.getCurrentPosition(function(position) {
            FEETCH(data.getUrlTodayCoords(position.coords.latitude, position.coords.longitude)).then(x => {
                SetCurrentWeather(x);
            });
            FEETCH(data.getUrlForecastTodayCoords(position.coords.latitude, position.coords.longitude)).then(x => {
                SetForecastTodayTable(x);
                FillForecastArray(x);
            });
        });
    } else {//search by default city
        FEETCH(data.getUrlTodayCity(data.defaultCity)).then(x => {
            SetCurrentWeather(x);
        });
        FEETCH(data.getUrlForecastTodayCity(data.defaultCity)).then(x => {
            SetForecastTodayTable(x);
            FillForecastArray(x);
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
                $('.forecast-table').css({"display":"none"});
                $('.forecast-blocks-container').css({"display":"none"});
            }
            else{
                $('#error_row').css({"display":"none"});
                $('.show-weather').css({"display":"block"});
                $('#btn_today').addClass('active-btn');
                $('#btn_5day').removeClass('active-btn');
                SetCurrentWeather(x);
            }
        });
        FEETCH(data.getUrlForecastTodayCity(userCity)).then(x => {
            if(x.cod != 200){
                $('#error_row').css({"display":"block"});
                $('.error-descr').text(`${userCity} could not be found. Please try enter a different location.`);
                $('.show-weather').css({"display":"none"});
            }
            else{
                $('#error_row').css({"display":"none"});
                $('.show-weather').css({"display":"block"});
                $('#btn_today').addClass('active-btn');
                $('#btn_5day').removeClass('active-btn');
                $('.forecast-table').css({"display":"block"});
                $('.forecast-blocks-container').css({"display":"none"});
                SetForecastTodayTable(x);
            }
        });
});

$('#btn_5day').on( "click", function() {
    $('#btn_today').removeClass('active-btn');
    $(this).addClass('active-btn');
    if($('#error_row').css('display') == "none"){
        $('.show-weather').css({"display":"none"});
        $('.forecast-blocks-container').css({"display":"block"});
        $('.forecast-table').css({"display":"block"});
        $('.forecasts-blocks:eq(0)').addClass('active-forecast-block');
    }
});

$('#btn_today').on( "click", function() {
    $('#btn_5day').removeClass('active-btn');
    $(this).addClass('active-btn');
    if($('#error_row').css('display') == "none"){
        $('.show-weather').css({"display":"block"});
        $('.forecast-blocks-container').css({"display":"none"});
        $('.forecasts-blocks').removeClass('active-forecast-block');
        BackForecastTable();
    }
});

$('.forecasts-blocks').on( "click", function(e) {
    $(this).addClass('active-forecast-block');
    $('.forecasts-blocks').not(this).removeClass('active-forecast-block');
    SetForecastTodayTableByInd($( this ).index());
});

