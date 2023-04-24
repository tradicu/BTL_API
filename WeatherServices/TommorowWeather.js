var lat = document.getElementById("mydata").dataset.lat;
var lon = document.getElementById("mydata").dataset.lon;
$(document).ready(function () {
    getAllDetail(lat, lon);
    addarr(lat, lon);
    getCurrentWeatherDetail();
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


        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}
//giờ
function formatTime(timeString) {
    const [date, time] = timeString.split(' ');
    const [hour, minute] = time.slice(0, 5).split(':');
    return `${hour}:${minute}`;
}

//Lấy tất cả sản phẩm khi load trang
function getAllDetail(lat, lon) {
    var str = '';
    // Lấy ngày hiện tại
    let currentDate = new Date();

    // Tính toán ngày tiếp theo
    let tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    // Định dạng ngày tháng
    let formattedDate = tomorrowDate.toISOString().slice(0, 10);

    // Tạo đường dẫn API
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a3b34ffd190842a89b171718231704&q=${lat},${lon}&days=2&lang=vi&dt=${formattedDate}&aqi=no&alerts=no`;
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
            var str2 = `${data.location.name}`
            $.each(data.forecast.forecastday[0].hour, function (key, val) {
                str += `<details class="weather-day text-dark">
                                <summary class="weather-summary text-dark" data-toggle="collapse" data-target="#detail-22-04-01-00" aria-expanded="false" aria-controls="detail-22-04-01-00">
                                    <div class="weather-summary-content text-dark">
                                        <div class="weather-summary-title text-dark">
                                            <h2 class="summary-day text-dark font-h2">
                                                <span>${formatTime(val.time)}</span>
                                            </h2>
                                            <div class="summary-temperature text-dark">
                                                <span class="summary-temperature-min">
                                                    ${val.temp_c}°
                                                </span>
                                                <span class="summary-temperature-max">

                                                    <span class="summary-temperature-max-value">
                                                        /${val.temp_c}°
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="summary-description text-dark d-flex">
                                                <img src="${val.condition.icon}" alt="Mây cụm" class="summary-img">
                                                <span class="summary-description-detail align-self-center ms-2">
                                                    ${val.condition.text}
                                                </span>
                                            </div>
                                            <div class="summary-humidity text-dark d-none d-sm-block" title="Khả năng có mưa">
                                                <span class="summary-icon">
                                                    <i class="bi bi-droplet"></i>
                                                </span>
                                                <span>
                                                    ${val.chance_of_rain} %
                                                </span>
                                            </div>
                                            <div class="summary-speed text-dark d-none d-sm-block">
                                                <span class="summary-icon">
                                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="wind" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                                                </span>
                                                <span>
                                                    ${val.wind_kph} km/h
                                                </span>
                                            </div>
                                        </div>
                                        <span class="weather-summary-toggle">
                                            <i class="bi bi-chevron-down"></i>
                                        </span>
                                    </div>
                                </summary>
                                <div class="weather-content text-dark" id="detail-22-04-01-00">
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
                                                    ${val.pressure_mb} mmhg
                                                </span>
                                            </div>
                                        </div>
                                        <div class="d-flex weather-content-item-sun text-dark">
                                            <div class="avatar">
                                                <span class="summary-icon">
                                                    <i class="bi bi-droplet"></i>
                                                </span>
                                            </div>
                                            <div class="flex-1 pt-1 ml-2">
                                                <h6 class="fw-bold mb-1">UV</h6>
                                                <div class="d-flex ml-auto align-items-center">
                                                    <span>
                                                        ${val.uv} %
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
                                                        ${val.vis_km} km
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </details>`
            });
            $('.weatherPlace').html(str2);
            $('#allDetail').append(str);
            var outside = data.forecast.forecastday[0];
            //str2 = `<div class="current-location">
            //            <div class="location-name">
            //                <h2 class="location-name-main font-h2">
            //                    <a href="/cao-bang">
            //                        Thời tiết ${data.location.name}
            //                    </a>
            //                </h2>
            //            </div>
            //            <div class="location-data">
            //                <div class="location-data-summary">
            //                    <div class="d-flex">
            //                        <div class="overview-current">
            //                            <img src="${data.forecast.forecastday[0].day.condition.icon}" class="me-2" alt="Mây cụm" />
            //                            <span class="current-temperature">${data.forecast.forecastday[0].day.avgtemp_c}°</span>
            //                        </div>
            //                        <div class="overview-caption ms-2">
            //                            <p class="overview-caption-item">${data.forecast.forecastday[0].day.condition.text}</p>
            //                            <p class="overview-caption-item">Cảm giác như 35°.</p>
            //                        </div>
            //                    </div>

            //                    <div class="weather-detail mt-2">
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <span class="weather-icon">
            //                                        <i class="bi bi-sun"></i>
            //                                    </span>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Mặt trời mọc/lặn</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <div class="weather-sun">
            //                                    <span><i class="bi bi-sunrise"></i> ${outside.astro.sunrise}</span>
            //                                    <span>
            //                                        <i class="bi bi-sunset"></i>
            //                                        ${outside.astro.sunset}
            //                                    </span>

            //                                </div>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="temp" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Nhiệt độ</title><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Thấp/Cao</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">${outside.day.mintemp_c}°/${outside.day.maxtemp_c}°</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <span class="weather-icon">
            //                                        <i class="bi bi-droplet"></i>
            //                                    </span>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Độ ẩm</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">${outside.day.avghumidity}%</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="pressure" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Áp suất</title><path d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Áp suất</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">751.56 mmhg</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="visibility" theme="dark" data-testid="Icon" aria-hidden="true" role="img" width="1024" height="1024" viewBox="0 0 1024 1024"><title>Tầm nhìn</title><path d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z"></path><path d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Tầm nhìn</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">${outside.day.avgvis_km} km</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="wind" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Gió</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">${outside.day.maxwind_kph} km/h</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="dewpoint" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Điểm ngưng</title><path d="M17 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path fill-rule="evenodd" d="M9.743 18.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M9.855 5c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772C9.245 5.14 9.54 5 9.855 5"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">Điểm ngưng</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">21 °</span>
            //                            </div>
            //                        </div>
            //                        <div class="separator-dashed"></div>
            //                        <div class="d-flex">
            //                            <div class="avatar">
            //                                <div class="avatar-img rounded-circle">
            //                                    <svg class="WeatherDetailsListItem--icon--NgMGn Icon--icon--2AbGu Icon--darkTheme--2U1o8" set="current-conditions" name="uv" theme="dark" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>UV Level</title><path d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z"></path><path d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z"></path></svg>
            //                                </div>
            //                            </div>
            //                            <div class="flex-1 pt-1 ms-2">
            //                                <h3 class="fw-bold mb-1">UV</h3>
            //                            </div>
            //                            <div class="d-flex ms-auto align-items-center">
            //                                <span class="text-white op-8 fw-bold">${outside.day.uv}</span>
            //                            </div>
            //                        </div>
            //                    </div>
            //                </div>
            //            </div>
            //        </div>
            //        <div class="card mt-3 sunrise" style="background-image:url(../resource/img/sunrise-sunset-bg.jpg)">
            //            <div class="card-body">
            //                <h2 class="font-h2">
            //                    Bình minh / Hoàng hôn
            //                </h2>
            //                <div class="d-flex justify-content-between">
            //                    <div class="sun-item">
            //                        <span>
            //                            ${outside.astro.sunrise}
            //                        </span>
            //                    </div>
            //                    <div class="sun-item">
            //                        <span>
            //                            ${outside.astro.sunset}
            //                        </span>
            //                    </div>
            //                </div>
            //            </div>
            //        </div>`
            //$('#leftSide').append(str2);
        }
    });
}
/*<script>*/
//Biểu đồ Diệu Quỳnh
let arr = new Array(8);
let arrRainChance = new Array(8)
function addarr(lat, lon) {
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a3b34ffd190842a89b171718231704&q=${lat},${lon}&days=2&aqi=no&alerts=no&lang=vi`;
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
                arr[dem] = val.temp_c; // nhiệt độ
                dem++;
               
            }
        }
    });
}
// theo giờ
const dataMuaTheoGio = {
    labels: ['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00'], // khung giờ
    datasets: [
        {
            type: 'line',
            label: 'Nhiệt độ',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            data: arr, // gán nhiệt độ
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
const configMuaTheoGio = {
    plugins: [ChartDataLabels],
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
    new Chart(ctx, configMuaTheoGio);
}
drawChartMuaHour();
{/*</script>*/ }