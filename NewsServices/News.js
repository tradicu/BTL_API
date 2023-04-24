function HotNews() {
    $.ajax({
        url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=b38ccf3fc2a8464ca490114081bfe456&category=general",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var news_ul = document.getElementById('hot_news');
            // Xử lí dữ liệu
            for (let i = 0; i < 3; i++) {
                var title = data.articles[i].title;
                var imageUrl = data.articles[i].urlToImage;
                str = `<li class="media my-1 pb-2 list-top-new-items">
                            <img src="${imageUrl}" class="me-3">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">${title} </h5>
                            </div>
                            <a href="/TinTuc/Detail?id=${i}" class="top-news-link"></a>
                        </li>`;
                news_ul.insertAdjacentHTML('beforeend', str);
            }
        },
        error: function () {
            alert("Không thể lấy News!");
        }
    });
}
$(document).ready(function () {
    HotNews();
})