var fs = require('fs');
var http = require('http');
var url = require('url');
var template = require('art-template');
var comments = [
    {name:'张三',message:'我先试试看1',dataTime:'2020-05-01'},
    {name:'李四',message:'我先试试看2',dataTime:'2020-05-01'},
    {name:'王五',message:'我先试试看3',dataTime:'2020-05-01'},
]

http.createServer(function (request, response) {
    //获取地址
    // var url = request.url;
    // console.log(url)
    var pathnameObj = url.parse(request.url,true) 
    var pathname = pathnameObj.pathname;
    console.log(pathname)
    if(pathname === '/'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){console.log(404)}
            // response.end(data);
            //用template将comments渲染到页面
            var htmlStr = template.render(data.toString(),{
                comments: comments,
            })
            response.end(htmlStr)
        })
    }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){console.log(404)}
            response.end(data)
        })
    }else if(pathname === '/pinglun'){
        //拿到输入的内容
        var con = pathnameObj.query;
        comments.unshift(con);
        console.log(con);
        //重定向，点击提交回到初始页
        response.statusCode = 302;
        response.setHeader('Location','/');
        response.end();

    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){console.log(404)}
            response.end(data)
        })
    }
    
}).listen(3000, function () {
    console.log('server is running')
})
/* 
    1.引入核心模块 fs http 监听事件
    2.加载index.html页面
        2.1读文件，判断err data
        2.2获取路径，根据不同路径访问不同文件，用url.parse()获取路径 / /post /pinglun
        2.3提取评论的内容
            2.3.1 在js文件中国定义conmments(与index.html文件中的要显示的内容同名)
            2.3.2安装并引用art-template，引入art-template 修改index.html文件中要显示的信息为art-template的类型{{}}
            2.3.3当路径是/pinglun时，拿到url中query对象
            2.3.4在初始页面中对template进行渲染，将comments渲染到页面
            2.3.5将拿到的url中query对象中的内容显示到页面，将页面中新输入的内容添加到数组中
        3.重定向
        点击提交回到初始页面
*/