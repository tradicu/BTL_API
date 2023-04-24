const options = {
    key: '7kYbFRfWpWle2AlQoD75rmxz4FBnZlEa', // REPLACE WITH YOUR KEY !!!
    lat: 21.0245,
    lon: 105.8412,
    //const overlays = ['rain', 'wind', 'temp', 'clouds'];
    //overlay: 'rain', //thay đổi màu theo thời tiết: gió, mây,...
    timestamp: "2021-09-01T12:00:00Z", //thời điểm bạn muốn hiển thị thông tin dữ liệu
    level: "surface", //để hiển thị dữ liệu trên mức bề mặt.       
    zoom: 5,
};

windyInit(options, windyAPI => {
    const {
        picker,
        utils, //chuyển dữ liệu thời tiết từ 1 mảng  thành 1 đối tượng
        broadcast, //lưu trữ và quản lý dữ liệu
        store
    } = windyAPI;
    // windyAPI.broadcast.setView([lat, lon], 10);
    picker.on('pickerOpened', ({
        lat,
        lon,
        values,
        overlay
    }) => {
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log('opened', lat, lon, values, overlay);
        //sử dụng hàm `wind2obj()` trong đối tượng `utils` của Windy API.
        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', ({
        lat,
        lon,
        values, //Giá trị thông tin thời tiết tại vị trí được chọn, được biểu diễn dưới dạng một mảng chứa các gía trị vector của gió tại đó.
        overlay
    }) => {
        // picker was dragged by user to latLon coords
        console.log('moved', lat, lon, values, overlay);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });
    // Lưu lại tọa độ thay đổi
    store.on('pickerLocation', ({
        lat,
        lon
    }) => {
        console.log(lat, lon);

        const {
            values,
            overlay
        } = picker.getParams();
        console.log('location changed', lat, lon, values, overlay);
    });

    // Tạo và hiển thị picker
    broadcast.once('redrawFinished', () => {
        // tọa độ cắm cọc
        picker.open({
            lat: 21.0245,
            lon: 105.8412
        });
    });
});