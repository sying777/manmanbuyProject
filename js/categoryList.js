$(function(){

    $.ajax({
        url:"http://localhost:9090/api/getcategorytitle",
        success:function(obj){
           console.log(obj);
           var html = template('categoryFirstTpl',obj);
           $('.category-table').html(html);
        }
    })

    $('.mui-table-view').on('tap','.category-table .big-title',function () {
        var titleid = $(this).data('id');
        console.log(titleid);
        $.ajax({
            url:"http://localhost:9090/api/getcategory",
            data:{titleid:titleid},
            success:function(obj){
              var html = template('categorySecondTpl',obj);
              $('.category-ul').html(html);
            }
        })
    })
    
    

})