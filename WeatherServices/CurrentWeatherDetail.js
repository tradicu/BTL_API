var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Lấy dữ liệu từ thuộc tính data- của id="mydata"
var place = document.getElementById("mydata").dataset.place;
var lon = document.getElementById("mydata").dataset.lon;
var lat = document.getElementById("mydata").dataset.lat;

function getCurrentWeatherDetail() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=1&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);

            // Lấy dữ liệu thời tiết hiện tại
            var location = data.location.name;
            var country = data.location.country;
            var iconUrl = data.current.condition.icon;
            var temp = data.current.temp_c;
            var text = data.current.condition.text;
            var feels_like = data.current.feelslike_c;
            var humidity = data.current.humidity;
            var vis_km = data.current.vis_km;
            var wind_kph = data.current.wind_kph;
            var uv = data.current.uv;
            var temp_min = data.forecast.forecastday[0].day.mintemp_c;
            var temp_max = data.forecast.forecastday[0].day.maxtemp_c;


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

        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}


function Weather_by_48_hours() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=2&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            //mảng lưu ngày
            var arrGio = [];
            //mảng lưu data
            var dataBieuDo = [];
            var dataMua = [];
            // Hiển thị thời tiết 48h - 2 ngày
            html_48h = ``;
            for (let ngay = 0; ngay < 2; ngay++) {
                for (let gio = 0; gio < 24; gio++) {
                    // Lấy dữ liệu
                    
                    var thoigian = data.forecast.forecastday[ngay].hour[gio].time;
                    var temp_c = data.forecast.forecastday[ngay].hour[gio].temp_c;
                    var temp_feels = data.forecast.forecastday[ngay].hour[gio].feelslike_c;
                    var src_icon = data.forecast.forecastday[ngay].hour[gio].condition.icon;
                    var chance_of_rain = data.forecast.forecastday[ngay].hour[gio].chance_of_rain;
                    var description = data.forecast.forecastday[ngay].hour[gio].condition.text;
                    //Array time
                    arrGio.push(thoigian);
                    //Array temp
                    dataBieuDo.push(temp_c);

                    //Array luong mua
                    dataMua.push(chance_of_rain);
                    // Tạo chuỗi html
                    str = `<div class="weather-item bg-white text-dark">
                                    <h3 class="weather-item-title font-h3">
                                        <span>${thoigian}</span>
                                    </h3>
                                    <div class="weather-item-footer">
                                        <span title="Temp">${temp_c} °</span>
                                        /
                                        <span title="Feels Like">${temp_feels} °</span>
                                    </div>
                                    <div class="weather-item-body">
                                        <img src="${src_icon}" alt="${description}">
                                        <div class="Khả năng có mưa" title="Khả năng có mưa">
                                            <i class="bi bi-droplet"></i>
                                            ${chance_of_rain} %
                                        </div>
                                        <p class="mb-0"> ${description} </p>
                                    </div>
                                </div>`;
                    html_48h += str;
                }
            }
            $("#weather_48h").html(html_48h);
            $(function () {
                Highcharts.chart('chart1', {
                    title: {
                        text: 'Khả năng có thể mưa',
                    },
                    xAxis: {
                        categories: arrGio
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
                        data: dataBieuDo
                    }]
                });
            });
            $(function () {
                Highcharts.chart('chart', {
                    title: {
                        text: 'Nhiệt độ',
                    },
                    xAxis: {
                        categories: arrGio
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
                        data:dataMua
                        ]
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
})
