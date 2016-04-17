var express= require('express');
var path=require('path');
var bodyParser=require('body-parser');
var crypto=require('crypto')
var session=require('express-session')
var moment=require('moment')
var checkLogin=require('./checkLogin.js');


//这是提示用户输入错误地消息，要传给app.get请求，显示在register.ejs中
var message1='';
var message2='';
var message3='';
var message4='';
//引入mongoose
var mongoose=require('mongoose');
//引入模型
var models=require('./models/models');

//连接服务器
mongoose.connect('mongodb://localhost:27017/notes');
mongoose.connection.on('error',console.error.bind(console,'链接数据库失败'));

//创建express实例
var app=express();

//定义ejs模板引擎和模板位置
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//定义静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//建立session模型
app.use(session({
    secret:'1234',
    name:'mynote',
    cookie:{maxAge:1000*60*60*12*7},//设置session保存时间为60分钟*12*7=一周
    resave:false,
    saveUninitialized:true
}));

var User=models.User;
var Note=models.Note;

app.get('/',checkLogin.noLogin);//检查是否已经登录，如果没有，那需要登录
app.get('/',function(req,res){
    Note.find({
        author:req.session.user.username
    }).exec(function(err,allNotes){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
            res.render('index',{
            user:req.session.user,
            title:'首页',
            notes:allNotes
         });
    })
});

app.get('/register',checkLogin.beLogin2);//检查是否已经登录，如果是，那不可以再登录
app.get('/register',function(req,res){
   console.log('注册！');

    res.render('register',{                //render（对应的ejs）
        user:req.session.user,
        title:'注册',
        err1:message1,
        err2:message2
    });
    message1='';
    message2=''
});//设计路由
app.post('/register',function(req,res){
     var username=req.body.username,
          password=req.body.password,
          passwordRepeat=req.body.passwordRepeat;

    //检查输入的用户名是否为空
    if (username.trim().length==0) {
        console.log('用户名不能为空！');
        message1='用户名长度为3-20,不能为空！';
        return res.redirect('/register');
    }
    if (username.trim().length<3||username.trim().length>20)
    {
        console.log('用户名长度为3-20！');
        message1='用户名长度为3-20！';
        return res.redirect('/register');
    }
    var rename =/^[a-z]|[A-Z]|[0-9]|[_]{3,20}$/;

    if(!rename.exec(username))
    {
        console.log('用户名只能是字母、数字、下划线的组合！');
        message1='用户名只能是字母、数字、下划线的组合！';
        return res.redirect('/register');
    }
    if (password.trim().length==0||passwordRepeat.trim().length==0)
    {
        console.log('密码和确认密码不能为空！');
        message2='密码和确认密码不能为空！';
        return res.redirect('/register');
    }
    if (password.length<6)
    {
        console.log('密码不能少于6位！');
        message2='密码不能少于6位！';
        return res.redirect('/register');
    }
    if(!(password.match(/([0-9])+/) && password.match(/([A-Z])+/)  && password.match(/([a-z])+/)))
    {
        console.log('密码必须同时包含大写字母、小写字母和数字！');
        message2='密码必须同时包含大写字母、小写字母和数字！';
        return res.redirect('/register');
    }

    if (password!=passwordRepeat)
    {
        console.log('两次密码不一致！');
        message2='两次密码不一致！';
        return res.redirect('/register');
    }
    //检查用户名是否已经存在
    User.findOne({username:username},function(err,user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        if(user){
            console.log('用户名已经存在');
            message1='用户名已经存在';
            return res.redirect('/register');
        }
        var md5=crypto.createHash('md5'),
            md5password=md5.update(password).digest('hex');
        var newUser=new User({
            username:username,
            password:md5password
        });
        newUser.save(function(err,doc){
            if(err){
                console.log(err);
                return res.redirect('/register');
            }
            console.log('注册成功');
            return res.redirect('/');
        });
     });

})

app.get('/login',checkLogin.beLogin1);//检查是否已经登录，如果是，那不可以再登录
app.get('/login',function(req,res){
    console.log('登录！');
    res.render('login',{
        user:req.session.user,
        title:'登录',//用户登陆后将用户信息存入session对象，可以通过req参数来存储和访问session对象,req.session是一个JSON格式的JavaScript对象
         err3:message3,
         err4:message4
    });
    message3='';
    message4=''
});
app.post('/login', function (req,res) {

        var username=req.body.username,
            password=req.body.password;
    User.findOne({username:username},function(err,user){
        if(err){
            console.log(err);
            message3=err;
            return res.redirect('/login');
        }
        if(!user){
            console.log('用户不存在');
            message3='用户不存在';
            return res.redirect('/login');
        }
        var md5=crypto.createHash('md5'),
            md5password=md5.update(password).digest('hex');
        if(user.password!=md5password) {
            console.log('密码错误！');
            message4='密码错误！';
            return res.redirect('/login');
        }
        console.log('登录成功！');
        user.password=null;
        delete user.password;
        req.session.user=user;
        return res.redirect('/');


    });
});


app.get('/post',function(req,res){
    console.log('发布！');
    res.render('post',{
        user:req.session.user,
        title:'发布'

    });
});
app.post('/post',function(req,res){
    var note=new Note({
        title:req.body.title,
        author:req.session.user.username,
        tag:req.body.tag,
        content:req.body.content
    });
        note.save(function(err,doc){
            if(err){
                console.log(err);
                return res.redirect('/post');
            }
            console.log('文章发表成功');
            return res.redirect('/');
        });
});


app.get('/detail/',function(req,res){
    console.log('查看笔记！');
    res.render('detail',{
        user:req.session.user,
        title:'查看笔记'

    });
});
app.get('/detail/:_id',function(req,res){
    console.log('查看笔记!');
    Note.findOne({_id:req.params._id})
         .exec(function(err,art){
            if(err){
                console.log(err);
                return res.redirect('/');
            }
            if(art){
                res.render('detail',{
                    title:"笔记详情",
                    user:req.session.user,
                    art:art,
                    moment:moment
                })
            }
        })
})


app.get('/quit',function(req,res){
    req.session.user=null;
    console.log('退出！');

    return res.redirect('/login');
});



app.listen(3000,function(req,res){
    console.log('app is runnning at port 3000');
});
