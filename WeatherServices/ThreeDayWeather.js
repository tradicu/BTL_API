var lat = document.getElementById("mydata").dataset.lat;
var lon = document.getElementById("mydata").dataset.lon;
$(document).ready(function () {

    addarr(lat, lon);
    drawChart();
    getAllDetail(lat, lon);
    getCurrentWeatherDetail()
});

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
            var wind_kph = data.current.wind_kph;
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
function formatTime(timeString) {
    const [date, time] = timeString.split(' ');
    const [hour, minute] = time.slice(0, 5).split(':');
    return `${hour}:${minute}`;
}
function getAllDetail(lat, lon) {
    var str = '';
    // Lấy ngày hiện tại
    let currentDate = new Date();

    // Tính toán ngày tiếp theo
    let tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    // Định dạng ngày tháng
    let formattedDate = tomorrowDate.toISOString().slice(0, 10);

    // Tạo đường dẫn API
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a3b34ffd190842a89b171718231704&q=${lat},${lon}&days=3&aqi=yes&alerts=yes&lang=vi`;
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
            var str2 = `<h1 class="card-title font-size-18">
                                <a href="/cao-bang/3-ngay-toi">
                                    Thời tiết ${data.location.name} 3 ngày tới
                                </a>
                            </h1>`;
            $('.weatherPlace').html(data.location.name);
            $.each(data.forecast.forecastday, function (key, val) {
                str += ` <div class="weather-date shadow-sm">
                                <h2 class="font-size-18 weather-date-title pt-2">
                                    <span>${val.date}</span>
                                </h2>
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="rounded p-3 weather-date-left">
                                            <div class="d-flex flex-wrap">
                                                <div class="overview-current">
                                                    <img src="${val.day.condition.icon}" alt="Mây rải rác">
                                                    <span class="current-temperature">
                                                        ${val.day.avgtemp_c}°
                                                    </span>
                                                </div>
                                                <div class="overview-caption mx-3">
                                                    <p class="overview-caption-item overview-caption-item-detail">
                                                        ${val.day.condition.text}
                                                    </p>
                                                    <p class="overview-caption-item overview-caption-summary-detail">Cảm giác như ${val.day.maxtemp_c}°.</p>
                                                </div>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="d-flex ms-2 me-auto">
                                                        <div class="avatar">
                                                            <div class="avatar-img rounded-circle">
                                                                <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Nhiệt độ</title><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                                                            </div>
                                                        </div>
                                                        <span class="fw-bold">
                                                            Thấp/Cao
                                                        </span>
                                                    </div>
                                                    <span class="">${val.day.mintemp_c}°/${val.day.maxtemp_c}°</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="d-flex ms-2 me-auto">
                                                        <div class="avatar">
                                                            <div class="weather-icon">
                                                                <i class="bi bi-droplet"></i>
                                                            </div>
                                                        </div>
                                                        <span class="fw-bold">
                                                            Độ ẩm
                                                        </span>
                                                    </div>
                                                    <span class=""> ${val.day.avghumidity} %</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="d-flex ms-2 me-auto">
                                                        <div class="avatar">
                                                            <div class="weather-icon">
                                                                <i class="bi bi-cloud-rain"></i>
                                                            </div>
                                                        </div>
                                                        <span class="fw-bold">
                                                            Lượng mưa
                                                        </span>
                                                    </div>
                                                    <span class="">${val.day.totalprecip_mm} mm</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="d-flex ms-2 me-auto">
                                                    <div class="avatar">
                                                        <div class="avatar-img rounded-circle">
                                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Nhiệt độ</title><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                                                        </div>
                                                    </div>
                                                    <span class="fw-bold">
                                                        Ngày/Đêm
                                                    </span>
                                                </div>
                                                <span class="">${val.day.maxtemp_c}°/${val.day.mintemp_c}°</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="d-flex ms-2 me-auto">
                                                    <div class="avatar">
                                                        <div class="avatar-img rounded-circle">
                                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Nhiệt độ</title><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                                                        </div>
                                                    </div>
                                                    <span class="fw-bold">
                                                        Sáng/Tối
                                                    </span>
                                                </div>
                                                <span class="">${val.day.maxtemp_c}°/${val.day.mintemp_c}°</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="d-flex ms-2 me-auto">
                                                    <div class="avatar">
                                                        <div class="avatar-img rounded-circle">
                                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="pressure" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Áp suất</title><path d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"></path></svg>
                                                        </div>
                                                    </div>
                                                    <span class="fw-bold">
                                                        Áp suất
                                                    </span>
                                                </div>
                                                <span class="">${val.hour[0].pressure_in} mmhg</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="d-flex ms-2 me-auto">
                                                    <div class="avatar">
                                                        <div class="avatar-img rounded-circle">
                                                            <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="wind" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                                                        </div>
                                                    </div>
                                                    <span class="fw-bold">
                                                        Gió
                                                    </span>
                                                </div>
                                                <span class="">
                                                    ${val.day.maxwind_kph} km/h
                                                </span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="d-flex ms-2 me-auto">
                                                    <div class="avatar">
                                                        <span class="weather-icon">
                                                            <i class="bi bi-sun"></i>
                                                        </span>
                                                    </div>
                                                    <span class="fw-bold">
                                                        Bình minh/Hoàng hôn
                                                    </span>
                                                </div>
                                                <div class="d-flex ml-auto align-items-center">
                                                    <div class="weather-sun">
                                                        <span><i class="bi bi-sunrise"></i>${val.astro.sunrise} </span>
                                                        <span>
                                                            <i class="bi bi-sunset"></i>
                                                            ${val.astro.sunset}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`;
            });
            $('#ThreeDay').append(str2);
            $('#ThreeDay').append(str);
        }
    });
}

/*<script>*/
let arr = new Array(8);
let arrRainChance = new Array(8)
function addarr(lat, lon) {
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a3b34ffd190842a89b171718231704&q=${lat},${lon}&days=3&aqi=yes&alerts=yes&lang=vi`;
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
            const hour = data.forecast.forecastday;
            for (let i = 0; i < hour.length; i++) {
                const val = hour[i];
                arrRainChance[dem] = val.day.totalprecip_mm; // tỷ lệ xảy ra mưa
                arr[dem] = val.day.avgtemp_c; // nhiệt độ
                dem++;
                console.log('1' + val.day.avgtemp_c);
            }
        }
    });
}
const data = {
    labels: ['Hôm nay', 'Ngày mai', 'Ngày kia'],
    datasets: [
        {
            type: 'line',
            label: 'Nhiệt độ',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            data: arr,
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
            label: 'Lượng mưa (mm)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            data: arrRainChance,
            datalabels: {
                align: 'end',
                color: 'rgb(0, 0, 0)',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        }]
};


const config = {
    plugins: [ChartDataLabels],
    type: 'line',
    data: data,
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
                scaleOverride: true,
                suggestedMax: 44,
                suggestedMin: 0,
            }
        },
        legend: {
            display: true,
            labels: {
                color: 'rgb(255, 99, 132)'
            },
            padding: 100
        }

    }
};

function drawChart() {
    var ctx = document.getElementById('myChart');
    new Chart(ctx, config);
}
//drawChart();
/*</script>*/