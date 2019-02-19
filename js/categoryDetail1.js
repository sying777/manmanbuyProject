$(function(){

    var id = queryId('categoryid');
        $.ajax({
            url:"http://localhost:9090/api/getcategorybyid",
            data:{categoryid:id},
            success:function(data){
                console.log(data);
                var html = template('productNavTpl',data);
                $('#titles').html(html);
            },
            error:function(error){//失败的回调函数
                console.log(err);
            }
        });



    
    var productid = queryId('productId');
    console.log(productid);
    $.ajax({
        url:'http://localhost:9090/api/getproduct',
        data:{productid:productid},
        success:function(obj){
           console.log(obj);
           var html = template('contentTpl',obj)
           $('.content').html(html);
           $('.content>table .p_pic>a').css({
             display:'block',
             width:'0.2rem',
             marginTop:'0.125rem'
            });
            $('.content>table .p_pic>a>img').css({
                width:'100%'
               });
           $('.content>table td>span').css({
               width:'0.6rem',
               height:'0.25rem',
               fontSize:'0.14rem',
               lineHeight:'0.25rem'
           });

           var reg = /([^\s]+)\s.*/;
           var str = obj.result[0].productName;
           str = str.replace(reg,"$1");
           $('#titles .nangao').html(str);



        }
    })


    $.ajax({
        url:'http://localhost:9090/api/getproductcom',
        data:{productid:productid},
        success:function(obj){
            console.log(obj);
            var html = template('commentTpl',obj);
            $('.detail-comment').html(html);
        }
    })




    function queryId (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        };
        return null;
    }
});