/**
 * Created by DELL on 2016/4/5.
 */
var http = require("http");
var parseUrl=require("url").parse;
var connect=require("connect");
var NEWs={
    1:"第一条新闻的内容",
    2:"第二条新闻的内容",
    3:"第三条新闻的内容"
}
function getNews(id){
    return NEWs[id]||"文章不存在";
}
var app=connect();

var server=http.createServer(function(req,res){

   function send(html){
        res.writeHead(200,{
        'content-type':'text/html;charset=utf-8'
        });
        res.end(html);
}

    var info=parseUrl(req.url,true);
    req.pathname=info.pathname;
    req.query=info.query;
    if(req.url==='/'){
        send('<ul>' +
            '<li><a href="/news?type=1&id=1">新闻1</a></li>' +
            '<li><a href="/news?type=1&id=2">新闻2</a></li>' +
            '<li><a href="/news?type=1&id=3">新闻3</a></li>' +
            '</ul>');
    }else if(req.pathname==='/news'&& req.query.type==='1'){
        send(getNews(req.query.id));
    }
     else {
        send('<h1>文章不存在！</h1>');
    }
});

server.listen(3000);