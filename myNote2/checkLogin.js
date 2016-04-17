/**
 * Created by DELL on 2016/4/3.
 */
function noLogin(req,res,next){
    if(!req.session.user){
        console.log('抱歉，您还没有登录！');
        return res.redirect('/login');
    }
    next();
}
function beLogin1(req,res,next){
    if(req.session.user){
        console.log('抱歉，您已经登录，不能再次登录！');
        return res.redirect('/');
    }
    next();
}
function beLogin2(req,res,next){
    if(req.session.user){
        console.log('抱歉，您已经注册，不能再次注册！');
        return res.redirect('/');
    }
    next();
}
exports.noLogin=noLogin;
exports.beLogin1=beLogin1;
exports.beLogin2=beLogin2;