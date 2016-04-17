/**
 * Created by DELL on 2016/4/9.
 */
var express=require('express');
var path=require('path');
var fs=require('fs')
var app=express();

app.set('view engine','ejs');
app.set('views',__dirname);

function serveStatic(root){
    return function(req,res,next){

        var file=req.originalUrl.slice(req.baseUrl.length+1);
        file=path.resolve(root,file);

        var stream=fs.createReadStream(file);
        stream.pipe(res);
    };
}
app.use('/public',serveStatic(__dirname+'/public'));
fs.exists(file,function(exists){
    if(exists){
        var stream=fs.creatReadStream(file);
        stream.pipe(res);

    }else{
        next();
    }
});

function getNewsList(){
    var list=[]
    for(var i=0;i<5;i++)
    {
        list.push(getNewById(i+1));
    }
    return list;
}
