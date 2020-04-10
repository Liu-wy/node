//留言板
//引入核心模块
var fs = require('fs');
var http = require('http');
var url = require('url');
var template = require('art-template');
//post页面展示的内容
var comments = [
    {name:'张三',message:'几天内还得',dataTime:'2020-02-03'},
    {name:'李四',message:'几撒旦飞洒得',dataTime:'2020-02-03'},
    {name:'小白',message:'士大夫谁的',dataTime:'2020-02-03'}
]

//服务请求
http.createServer(function(request,response){
    var path = url.parse(request.url,true)
    var pathname = path.pathname;
    //请求不同路径
    if(pathname ==='/'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){return console.log('404')}
            //渲染页面
            var htmlStr = template.render(data.toString(),{
                //把设定的默认的comments添加到页面中
                comments:comments,
            })
            response.end(htmlStr)
        })
    }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){return console.log('404')}
            response.end(data)
        })
    }else if(pathname === '/pinglun'){
        //获取post中输入的内容,然后渲染到初始页面
        var con = path.query;
        comments.unshift(con);
        //添加重定向，点击发表返回首页
        response.statusCode = 302;
        response.setHeader('Location','/');
        response.end();
       /*  response.statusCode = 302;
        response.setHeader('Location','/');
        response.end(); */

    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){console.log(404)}
            response.end(data)
        })
    }

}).listen(4000,function(){
    console.log("server is running")
})