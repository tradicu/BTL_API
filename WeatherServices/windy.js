const options = {
    key: '7kYbFRfWpWle2AlQoD75rmxz4FBnZlEa', // REPLACE WITH YOUR KEY !!!
    lat: 50.4,
    lon: 14.3,
    //const overlays = ['rain', 'wind', 'temp', 'clouds'];
    overlay: 'rain', //thay đổi màu theo thời tiết: gió, mây,...
    timestamp: "2021-09-01T12:00:00Z", //thời điểm bạn muốn hiển thị thông tin dữ liệu
    level: "surface", //để hiển thị dữ liệu trên mức bề mặt.       
    zoom: 5,
};

windyInit(options, windyAPI => {
    const {
        picker,
        utils,
        broadcast,
        store
    } = windyAPI;

    picker.on('pickerOpened', ({
        lat,
        lon,
        values,
        overlay
    }) => {
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log('opened', lat, lon, values, overlay);

        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', ({
        lat,
        lon,
        values,
        overlay
    }) => {
        // picker was dragged by user to latLon coords
        console.log('moved', lat, lon, values, overlay);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });

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

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        // tọa độ cắm cọc
        picker.open({
            lat: 50.4,
            lon: 14.3
        });
    });
});