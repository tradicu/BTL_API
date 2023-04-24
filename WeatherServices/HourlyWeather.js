// Lấy dữ liệu từ thuộc tính data- của id="mydata"
var place = document.getElementById("mydata").dataset.place;
var lon = document.getElementById("mydata").dataset.lon;
var lat = document.getElementById("mydata").dataset.lat;


//mảng lưu ngày
var arrGio1 = [];
//mảng lưu data
var dataBieuDo1 = [];
var dataMua1 = [];

function getCurrentWeatherDetail() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=1&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            //console.log(data);

            // Lấy dữ liệu thời tiết hiện tại
            var location = data.location.name;
            var country = data.location.country;
            var iconUrl = data.current.condition.icon;
            var temp = data.current.temp_c;
            var text = data.current.condition.text;
            var feels_like = data.current.feelslike_c;
            var humidity = data.current.humidity;
            var vis_km = data.current.vis_km;
            var wind_kph = (data.current.wind_kph * 1.609344).toFixed(2);
            var uv = data.current.uv;
            var temp_min = data.forecast.forecastday[0].day.mintemp_c;
            var temp_max = data.forecast.forecastday[0].day.maxtemp_c;

            var sunrise = data.forecast.forecastday[0].astro.sunrise;
            var sunset = data.forecast.forecastday[0].astro.sunset;
            var pressure_mmHg = (data.current.pressure_mb * 0.75006157584566).toFixed(2);
            // Hiển thị thông tin thời tiết hiện tại lên trang web
            $("#location").text(`Dự báo thời tiết ${location}, ${country}`);
            $("#image-div").prepend(`<img id="current-weather-image" src="${iconUrl}" />`);
            $("#current-temp").text(`${temp} °`);
            $("#text").text(`${text}`);
            $("#feels_like").text(`Cảm giác như ${feels_like}`);
            $("#humidity").text(`${humidity} %`);
            $("#vis_km").text(`${vis_km} km`);
            $("#wind_kph").text(`${wind_kph} km/h`);
            $("#uv").text(`${uv}`);
            $("#min_max_temp").text(`${temp_min}°/${temp_max}°`);

            $("#sunrise").text(`${sunrise}`);
            $("#sunset").text(`${sunset}`);
            $("#sunrise1").text(`${sunrise}`);
            $("#sunset1").text(`${sunset}`);
            $("#pressure_mmHg").text(`${pressure_mmHg} mmhg`);
            // Hiển thị Ngày đêm sáng tối
            // 12h AM
            var temp_ngay = data.forecast.forecastday[0].hour[12].temp_c;
            // 0h AM
            var temp_dem = data.forecast.forecastday[0].hour[0].temp_c;
            // 8h AM
            var temp_sang = data.forecast.forecastday[0].hour[8].temp_c;
            // 7h PM
            var temp_toi = data.forecast.forecastday[0].hour[19].temp_c;
            $(`#temp_ngay`).text(`${temp_ngay}°`);
            $(`#temp_dem`).text(`${temp_dem}°`);
            $(`#temp_sang`).text(`${temp_sang}°`);
            $(`#temp_toi`).text(`${temp_toi}°`);

            //============================= Chất lượng không khí ============================//
            // Lấy dữ liệu
            // toFixed(n): để làm tròn đến số thập phân thứ n
            /*
            var co = data.current.air_quality.co.toFixed(2);
            var no2 = data.current.air_quality.no2.toFixed(2);
            var o3 = data.current.air_quality.o3.toFixed(2);
            var so2 = data.current.air_quality.so2.toFixed(2);
            var pm25 = data.current.air_quality.pm2_5.toFixed(2);
            var pm10 = data.current.air_quality.pm10.toFixed(2);
            var AQI = data.current.air_quality["us-epa-index"].toFixed(2);
            var DAQI = data.current.air_quality["gb-defra-index"].toFixed(2);
            */
            //console.log("co:" + co + ", no2:" + no2 + ", o3:" + o3 + ", so2:" + so2 + ", pm25:" + pm25 + ", pm10:" + pm10 + ", aqi:" + AQI + ", daqi:" + DAQI);
            // Hiển thị
            /*
            if (AQI < 5) {
                $(`#text_kk`).text(`Rất kém`);
                $(`#description_kk`).text(`Rất có hại cho sức khỏe. Cảnh báo nguy hại sức khỏe nghiêm trọng. Đa số mọi người đều bị ảnh hưởng.`);
            }
            else {
                $(`#text_kk`).text(`Khá tốt`);
                $(`#description_kk`).text(`Một không gian tốt.`);
            }

            $(`#co`).text(`${co}`);
            $(`#no2`).text(`${no2}`);
            $(`#o3`).text(`${o3}`);
            $(`#so2`).text(`${so2}`);
            $(`#pm25`).text(`${pm25}`);
            $(`#pm10`).text(`${pm10}`);
            $(`#AQI`).text(`${AQI}`);
            $(`#DAQI`).text(`${DAQI}`);
            */


        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}


function Weather_by_48_hours_a() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=2&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);

            // Hiển thị thời tiết 48h - 2 ngày
            html_48h = ``;
            for (let ngay = 0; ngay < 2; ngay++) {
                for (let gio = 0; gio < 24; gio++) {
                    // Lấy dữ liệu
                    var time = data.forecast.forecastday[ngay].hour[gio].time;
                    var temp_c = data.forecast.forecastday[ngay].hour[gio].temp_c;
                    var src_icon = data.forecast.forecastday[ngay].hour[gio].condition.icon;
                    var description = data.forecast.forecastday[ngay].hour[gio].condition.text;
                    var chance_of_rain = data.forecast.forecastday[ngay].hour[gio].chance_of_rain;
                    var wind_kmh = (data.forecast.forecastday[ngay].hour[gio].wind_mph * 1.609344).toFixed(2);
                    // Lượng mưa
                    var precip_mm = data.forecast.forecastday[ngay].hour[gio].precip_mm;
                    // Áp suất
                    var pressure_mmHg = (data.forecast.forecastday[ngay].hour[gio].pressure_mb * 0.75006157584566).toFixed(2);
                    // UV
                    var uv = data.forecast.forecastday[ngay].hour[gio].uv;
                    // Tầm nhìn
                    var vis_km = data.forecast.forecastday[ngay].hour[gio].vis_km;

                    if (ngay == 0) {
                        //Array time
                        arrGio1.push(time);
                        //Array temp
                        dataBieuDo1.push(temp_c);
                        //Array luong mua
                        dataMua1.push(chance_of_rain);
                    }

                    //console.log(time, temp_c, src_icon, description, chance_of_rain, wind_kmh, precip_mm, pressure_mmHg, uv, vis_km);
                    // Tạo chuỗi html
                    str = `<details class="weather-day text-dark">
                            <summary class="weather-summary text-dark" data-toggle="collapse" data-target="#detail-24-04-00-00" aria-expanded="false" aria-controls="detail-24-04-00-00">
                                
                                <div class="weather-summary-content text-dark">
                                    <div class="weather-summary-title text-dark">
                                        <h2 class="summary-day text-dark font-h2">
                                            <span>${time}</span>
                                        </h2>
                                        <div class="summary-temperature text-dark">
                                            <span class="summary-temperature-max">
                                                <span class="summary-temperature-max-value">
                                                    ${temp_c}°
                                                </span>
                                            </span>
                                        </div>
                                        <div class="summary-description text-dark d-flex">
                                            <img src="${src_icon}" alt="${description}" class="summary-img">
                                            <span class="summary-description-detail align-self-center ms-2">
                                                ${description}
                                            </span>
                                        </div>
                                        <div class="summary-humidity text-dark d-none d-sm-block" title="Khả năng có mưa">
                                            <span class="summary-icon">
                                                <i class="bi bi-droplet"></i>
                                            </span>
                                            <span>
                                                ${chance_of_rain} %
                                            </span>
                                        </div>
                                        <div class="summary-speed text-dark d-none d-sm-block">
                                            <span class="summary-icon">
                                                <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="wind" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                                            </span>
                                            <span>
                                                ${wind_kmh} km/h
                                            </span>
                                        </div>
                                    </div>
                                    <span class="weather-summary-toggle">
                                        <i class="bi bi-chevron-down"></i>
                                    </span>
                                </div>
                            </summary>
                            <div class="weather-content text-dark" id="detail-24-04-00-00">
                                <div class="d-flex flex-wrap justify-content-between weather-detail weather-detail-cac-ngay weather-detail-white mt-2">

                                    <div class="d-flex weather-content-item text-dark">
                                        <div class="avatar">
                                            <div class="avatar-img rounded-circle">
                                                <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="pressure" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Áp suất</title><path d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"></path></svg>
                                            </div>
                                        </div>
                                        <div class="flex-1 pt-1 ml-2 text-dark">
                                            <h6 class="fw-bold mb-1">Áp suất</h6>
                                            <span>
                                                ${pressure_mmHg} mmhg
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex weather-content-item-sun text-dark">
                                        <div class="avatar">
                                            <span class="summary-icon">
                                                <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Nhiệt độ</title><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                                            </span>
                                        </div>
                                        <div class="flex-1 pt-1 ml-2">
                                            <h6 class="fw-bold mb-1">UV</h6>
                                            <div class="d-flex ml-auto align-items-center">
                                                <span>
                                                    ${uv}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex weather-content-item-sun text-dark">
                                        <div class="avatar">
                                            <span class="summary-icon">
                                                <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="visibility" theme="dark" data-testid="Icon" aria-hidden="true" role="img" width="1024" height="1024" viewBox="0 0 1024 1024"><title>Tầm nhìn</title><path d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z"></path><path d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z"></path></svg>
                                            </span>
                                        </div>
                                        <div class="flex-1 pt-1 ml-2">
                                            <h6 class="fw-bold mb-1">Tầm nhìn</h6>
                                            <div class="d-flex ml-auto align-items-center">
                                                <div class="weather-sun">
                                                    ${vis_km} km
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>`;
                    html_48h += str;
                }
                console.log("arr giờ" + arrGio1);
                console.log("arr nhiet do" + dataBieuDo1);
                console.log("arr mua" + dataMua1);
            }
            $("#hourly-item").html(html_48h);

            // Vẽ
            $(function () {
                Highcharts.chart('chart1', {
                    title: {
                        text: 'Khả năng có thể mưa',
                    },
                    xAxis: {
                        categories: arrGio1
                    },
                    chart: {
                        type: 'column'

                    },
                    yAxis: {
                        title: {
                            text: 'mm'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'mm'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        data: dataMua1
                    }]
                });
            });
            $(function () {
                Highcharts.chart('chart', {
                    title: {
                        text: 'Nhiệt độ',
                    },
                    xAxis: {
                        categories: arrGio1
                    },

                    yAxis: {
                        title: {
                            text: 'Temperature (°C)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '°C'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        data: dataBieuDo1
                    }]
                });
            });

        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}


$(document).ready(function () {
    getCurrentWeatherDetail();
    Weather_by_48_hours_a();

})
