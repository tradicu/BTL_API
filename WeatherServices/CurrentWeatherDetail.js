// Lấy dữ liệu từ thuộc tính data- của id="mydata"
var place = document.getElementById("mydata").dataset.place;
var lon = document.getElementById("mydata").dataset.lon;
var lat = document.getElementById("mydata").dataset.lat;


//=================== Biểu đồ =====================
//mảng lưu ngày
var arrGio = [];
//mảng lưu data
var dataBieuDo = [];
var dataMua = [];
//==================================================================
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

            //============================= Chất lượng không khí ============================//
            // Lấy dữ liệu
            // toFixed(n): để làm tròn đến số thập phân thứ n
            var co = data.current.air_quality.co.toFixed(1);
            var no2 = data.current.air_quality.no2.toFixed(1);
            var o3 = data.current.air_quality.o3.toFixed(1);
            var so2 = data.current.air_quality.so2.toFixed(1);
            var pm25 = data.current.air_quality.pm2_5.toFixed(1);
            var pm10 = data.current.air_quality.pm10.toFixed(1);
            var AQI = data.current.air_quality["us-epa-index"].toFixed(1);
            var DAQI = data.current.air_quality["gb-defra-index"].toFixed(1);
            //console.log("co:" + co + ", no2:" + no2 + ", o3:" + o3 + ", so2:" + so2 + ", pm25:" + pm25 + ", pm10:" + pm10 + ", aqi:" + AQI + ", daqi:" + DAQI);
            // Hiển thị

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
            //console.log(data);

            //=================== Thông tin thời tiết 48h =====================
            // Hiển thị thời tiết 48h - 2 ngày
            html_48h = ``;
            for (let ngay = 0; ngay < 2; ngay++) {
                for (let gio = 0; gio < 24; gio++) {

                    //=================== Thông tin thời tiết 48h =====================
                    // Lấy dữ liệu
                    var thoigian = data.forecast.forecastday[ngay].hour[gio].time;
                    var temp_c = data.forecast.forecastday[ngay].hour[gio].temp_c;
                    var temp_feels = data.forecast.forecastday[ngay].hour[gio].feelslike_c;
                    var src_icon = data.forecast.forecastday[ngay].hour[gio].condition.icon;
                    var chance_of_rain = data.forecast.forecastday[ngay].hour[gio].chance_of_rain;
                    var description = data.forecast.forecastday[ngay].hour[gio].condition.text;

                    //=================== Biểu đồ =====================
                    //Array time
                    arrGio.push(thoigian);
                    //Array temp
                    dataBieuDo.push(temp_c);
                    //Array luong mua
                    dataMua.push(chance_of_rain);

                    //console.log(thoigian, temp_c, temp_feels, src_icon, chance_of_rain, description);
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
                        data: dataMua
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
                        data: dataBieuDo
                    }]
                });
            });
        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}


function Weather_by_3days() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=5&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            //console.log(data);

            // Hiển thị thời tiết 3 ngày
            html_3days = ``;
            for (let ngay = 0; ngay < 3; ngay++) {
                // Lấy dữ liệu
                var thoigian = data.forecast.forecastday[ngay].date;
                var temp_c_min = data.forecast.forecastday[ngay].day.mintemp_c;
                var temp_c_max = data.forecast.forecastday[ngay].day.maxtemp_c;
                var src_icon = data.forecast.forecastday[ngay].day.condition.icon;
                var description = data.forecast.forecastday[ngay].day.condition.text;
                var chance_of_rain = data.forecast.forecastday[ngay].day.daily_chance_of_rain;
                var wind_kmh = (data.forecast.forecastday[ngay].hour[0].wind_kph * 1.609344).toFixed(2);
                // 12h
                var temp_ngay = data.forecast.forecastday[ngay].hour[12].temp_c;
                // 0h
                var temp_dem = data.forecast.forecastday[ngay].hour[0].temp_c;
                // 8h sáng
                var temp_sang = data.forecast.forecastday[ngay].hour[8].temp_c;
                // 7h tối
                var temp_toi = data.forecast.forecastday[ngay].hour[19].temp_c;
                // Áp suất
                var pressure_mmHg = (data.forecast.forecastday[ngay].day.daily_chance_of_rain * 0.75006157584566).toFixed(2);
                // Mặt trời
                var sunrise = data.forecast.forecastday[ngay].astro.sunrise;
                var sunset = data.forecast.forecastday[ngay].astro.sunset;

                //console.log(thoigian, temp_c_min, temp_c_max, src_icon, description, chance_of_rain, wind_kmh, temp_ngay, temp_dem, temp_sang, temp_toi, pressure_mmHg, sunrise, sunset);
                // Tạo chuỗi html
                str = `<details class="weather-day text-dark">
                        <summary class="weather-summary text-dark" data-toggle="collapse" data-target="#detail-22-04" aria-expanded="false" aria-controls="detail-22-04">
                            <div class="weather-summary-content text-dark">
                                <div class="weather-summary-title text-dark">
                                    <h3 class="summary-day text-dark font-h3">
                                        <span>${thoigian}</span>
                                    </h3>
                                    <div class="summary-temperature text-dark">
                                        <span class="summary-temperature-min">
                                            ${temp_c_min}°
                                        </span>
                                        <span class="summary-temperature-max">
                                            /
                                            <span class="summary-temperature-max-value">
                                                ${temp_c_max}°
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
                                            ${chance_of_rain}%
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
                        <div class="weather-content text-dark" id="detail-22-04">
                            <div class="d-flex flex-wrap justify-content-between weather-detail weather-detail-cac-ngay weather-detail-white mt-2">
                                <div class="d-flex weather-content-item text-dark">
                                    <div class="avatar">
                                        <div class="avatar-img rounded-circle text-dark">
                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                                                <title>Nhiệt độ</title>
                                                <path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1 pt-1 ml-2 text-dark">
                                        <h6 class="fw-bold mb-1">Ngày/Đêm</h6>
                                        <div class="d-flex ml-auto align-items-center">
                                            <span class="op-8 fw-bold">
                                                ${temp_ngay}°/
                                                <span>${temp_dem}°</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex weather-content-item text-dark">
                                    <div class="avatar">
                                        <div class="avatar-img rounded-circle">
                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                                                <title>Nhiệt độ</title>
                                                <path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1 pt-1 ml-2 text-dark">
                                        <h6 class="fw-bold mb-1">Sáng/Tối</h6>
                                        <div class="d-flex ml-auto align-items-center">
                                            <span class="op-8 fw-bold">
                                                ${temp_sang}°/
                                                <span>${temp_toi}°</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
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
                                        <span class="weather-icon">
                                            <i class="bi bi-sun"></i>
                                        </span>
                                    </div>
                                    <div class="flex-1 pt-1 ml-2">
                                        <h6 class="fw-bold mb-1">Mặt trời mọc/lặn</h6>
                                        <div class="d-flex ml-auto align-items-center">
                                            <div class="weather-sun">
                                                <span><i class="bi bi-sunrise"></i>${sunrise}</span>
                                                <span>
                                                    <i class="bi bi-sunset"></i>
                                                    ${sunset}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex weather-content-item-sun text-dark d-block d-sm-none">
                                    <div class="avatar">
                                        <span class="summary-icon">
                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="wind" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                                        </span>
                                    </div>
                                    <div class="flex-1 pt-1 ml-2">
                                        <h6 class="fw-bold mb-1">Gió</h6>
                                        <div class="d-flex ml-auto align-items-center">
                                            <span>
                                                ${wind_kmh} km/h
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex weather-content-item-sun text-dark d-block d-sm-none">
                                    <div class="avatar">
                                        <span class="summary-icon">
                                            <i class="bi bi-droplet"></i>
                                        </span>
                                    </div>
                                    <div class="flex-1 pt-1 ml-2">
                                        <h6 class="fw-bold mb-1">Khả năng có mưa</h6>
                                        <div class="d-flex ml-auto align-items-center">
                                            <div class="weather-sun">
                                                ${chance_of_rain} %
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>`;
                html_3days += str;

                //======================================================= Bình minh - hoàng hôn hôm nay =====================================================//
                if (ngay == 0) {
                    $(`#sunrise`).text(`${sunrise}`);
                    $(`#sunset`).text(`${sunset}`);
                }
            }

            $("#Weather_3days").html(html_3days);

        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }
    });
}

//    < !--Vẽ đồ thị-- >

function DrawChart() {

    // Lấy đối tượng canvas bằng ID và lấy đối tượng vẽ 2D (context) của canvas
    var ctx1 = document.getElementById("rainHour").getContext("2d");

    // Tạo đối tượng gradient để tạo hiệu ứng gradient trên đường thẳng từ điểm (0,230) đến (0,50)
    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    // Tạo các điểm dừng màu cho dải màu từ 1->0
    gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 10)');
    gradientStroke1.addColorStop(0.8, 'rgba(94, 114, 228, 5)');
    gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
    new Chart(ctx1, {
        type: "line", // Dạng biểu đồ
        data: {
            // Các giá trị cho trục Ox
            labels: arrGio,
            datasets: [{
                label: "Đơn hàng",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#5e72e4",
                backgroundColor: gradientStroke1,
                borderWidth: 3,
                fill: true,
                // Giá trị của trục Oy tương ứng
                data: dataBieuDo,
                maxBarThickness: 6
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#fbfbfb',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#ccc',
                        padding: 20,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });
}

$(document).ready(function () {
    getCurrentWeatherDetail();
    Weather_by_48_hours();
    Weather_by_3days();
    //DrawChart();
    //drawChartMuaHour();
})

let arr1 = new Array(8);
let arrRainChance = new Array(8)
function addarr(lat, lon) {
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a3b34ffd190842a89b171718231704&q=${lat},${lon}&days=1&aqi=no&alerts=no&lang=vi`;
    $.ajax({
        // Gọi API
        url: apiUrl,
        method: "GET",
        contentType: "json",
        dataType: "json",
        error: function (response) {
            console.log(response);
        },

        //Khi thành công thì xuất hiện
        success: function (data) {
            var dem = 0;
            const hour = data.forecast.forecastday[0].hour;
            for (let i = 1; i < hour.length; i += 3) {
                const val = hour[i];
                arrRainChance[dem] = val.chance_of_rain; // tỷ lệ xảy ra mưa
                arr1[dem] = val.temp_c; // nhiệt độ
                dem++;

            }
            console.log("arr" + arr);
            console.log("arrRain:" + arrRainChance);
        }
    });
}
// theo giờ
const dataMuaTheoGio1 = {
    labels: ['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00'], // khung giờ
    datasets: [
        {
            type: 'line',
            label: 'Nhiệt độ',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            data: arr1, // gán nhiệt độ
            datalabels: {
                color: 'rgb(0, 0, 0)',
                align: 'end',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return value + '°';
                }
            }
        },
        {
            type: 'bar',
            label: 'Khả năng có mưa',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            data: arrRainChance, // gán tỷ lệ mưa
            datalabels: {
                align: 'end',
                anchor: 'end',
                color: 'rgb(0, 0, 0)',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return value + '%';
                }
            }
        }]
};
const configMuaTheoGio1 = {
    plugins: [ChartDataLabels],
    //labels: ['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00'], // khung giờ
    type: 'line',
    data: dataMuaTheoGio,
    options: {
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#36A2EB'
            }
        },
        responsive: true,
        scales: {
            y: {
                display: true,
                suggestedMax: 9
            }
        },
        legend: {
            display: true,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }

    }
};
function drawChartMuaHour() {
    var ctx = document.getElementById('rainHour');
    new Chart(ctx, configMuaTheoGio1);
}
