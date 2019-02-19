$(function () {
    // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }



    var brandtitleid = getQueryString('id');

    var brandTitle = getQueryString('brandTitle').split("十大品牌")[0];
    console.log(brandTitle);

    $('.title span').text(brandTitle);

    // 请求渲染top0
    $.ajax({
        url: 'http://localhost:9090/api/getbrand',
        data: {
            brandtitleid: brandtitleid
        },
        success: function (data) {
            console.log(data);
            if (data.result) {
                var top10html = template('top10Tpl', data);
                $('.top10 .mui-table-view').html(top10html);
            }
        }
    })



    // 请求渲染volume
    $.ajax({
        url: 'http://localhost:9090/api/getbrandproductlist',
        data: {
            brandtitleid: brandtitleid,
            pagesize: 4
        },
        success: function (data) {
            console.log(data);

            if (data.result) {
                var volumeHtml = template('volumeTpl', data);
                $('.volume .mui-table-view').html(volumeHtml);
            }

            var productid = data.result[0].productId;
            var productImg = data.result[0].productImg;
            var productName = data.result[0].productName;
            // 请求渲染newComments
            $.ajax({
                url: 'http://localhost:9090/api/getproductcom',
                data: {
                    productid: productid
                },
                success: function (data) {
                    // console.log(data);
                    for(var i = 0;i<data.result.length;i++){
                        data.result[i]['productImg'] = productImg;
                        data.result[i]['productName'] = productName;
                    }
                    console.log(data);
                    var newCommentsHtml = template('newCommentsTpl',data);
                    $('.newComments .mui-table-view').html(newCommentsHtml)
                }
            })
        }
    })






})