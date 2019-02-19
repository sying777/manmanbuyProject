$(function () {

    var id = queryId('categoryId');
    console.log(id);
    
    $.ajax({
        
        url:'http://localhost:9090/api/getcategorybyid',
        data:{categoryid:id},
        success:function(obj){
            console.log(obj);
            var html = template('navTpl',obj);
                $('.nav-left').html(html);
        }
    })
    
    $.ajax({
        url:"http://localhost:9090/api/getproductlist",
        data:{
            categoryid: id,
            pageid: page
        },
        success:function(obj){
           console.log(obj);
           var html = template('productTpl',obj);
           $('#detail').html(html);
           var totalPage = Math.ceil(obj.totalCount/obj.pagesize);
          
        //    console.log(totalPage);
           for(let i=1;i<=totalPage;i++){
            //    var page = i;
               var option = "<option class='option'>"+
               "<span class='spanFirst'>"+i+"</span> / <span>"+totalPage+"</span>"+
               "<i class='mui-icon mui-icon-arrowdown'></i> </option>";
               optionList += option;
               $('.selectList').html(optionList);
               
           }
           
        }
    })

    var page=1;
    var optionList ="";
    var flag = true;
    queryPage(1);
    function queryPage(page) {
        $.ajax({
            url:"http://localhost:9090/api/getproductlist",
            data:{
                categoryid: id,
                pageid: page
            },
            success:function(obj){
               console.log(obj);
               var html = template('productTpl',obj);
               $('#detail').html(html);    
               var totalPage = Math.ceil(obj.totalCount/obj.pagesize);
               if(flag){
                  for(let i=1;i<=totalPage;i++){
                    //    var page = i;
                       var option = "<option class='option'>"+
                       "<span class='spanFirst'>"+i+"</span> / <span>"+totalPage+"</span>"+
                       "<i class='mui-icon mui-icon-arrowdown'></i> </option>";
                       optionList += option;
                       $('.selectList').html(optionList);
                       
                   }
               }else{
                    $('.option .spanFirst').html(page);
                    flag = true;
                }
            }
        })
    }
    $('.nextPage').on('tap',function(){
        flag=false;
        page++;
        queryPage(page);
        // $('.option .spanFirst').html(page);
        scrollTo(0,0);
    })

    $('.lastPage').on('tap',function(){
        if (page > 1) {
            page -= 1;
        } else {
            return;
        }
        queryPage(page);
        scrollTo(0,0);
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
})