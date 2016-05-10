/**
 * Created by DELL on 2016/5/3.
 */
var mysql = require('mysql');

var pool = mysql.createPool({

    connectionLimit: 3,
    host: 'localhost',
    user: 'mynote',
    password: '123456',
    database: 'mynote'

});

/*
pool.getConnection(function (err, connection) {

    if (err) throw err;
    var value = 'zhangyaoyuan';
    var query = connection.query('SELECT * FROM user WHERE name=?', value, function (err, ret) {
        if (err) throw err;
        console.log(ret);
        connection.release();
    });
    console.log(query.sql);
});
*/
/*
function startQuery(){
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var value = 'zhangyaoyuan';
        var query = connection.query('SELECT * FROM user WHERE name=?', value, function (err, ret) {
            if (err) throw err;
            console.log(ret);
            setTimeout(function () {
                connection.release();
            },500);
        });
        console.log(query.sql);});}

for (var i = 0; i < 10; i++) {
    startQuery();
}

pool.getConnection(function (err, connection) {
    if (err) throw err;
    var username='zyy'
    var query1 = connection.query('SELECT * FROM user where name=?', username, function (err, result1) {
        if (err)throw err;
        console.log(query1.sql);
        console.log(result1);

        if (result1 != '') {

            console.log("用户已存在");
            message1 = '用户名已存在';


        }
        else {
            console.log("用户不存在");
            flag = 1;
            console.log(flag);
        }
        setTimeout(function () {
            connection.release();
        },500);


    });
});
*/
/*
pool.getConnection(function (err, connection) {
    if (err) throw err;
    var username='zyy'
    var password='111111'
    var query2 = connection.query('SELECT * FROM user where name=?', username, function (err, result2) {
        if (err)throw err;
        console.log(query2.sql);
        console.log(result2);

        if (result2 != '') {

            console.log("用户已存在");
            message1 = '用户名已存在';


        }
        else {
            console.log("用户不存在");
            flag = 1;
            console.log(flag);
        }
        setTimeout(function () {
            connection.release();
        },500);


    });
});

pool.getConnection(function (err, connection) {
    if (err) throw err;

    var Params = ['Wilson3','111111'];
    //var query =  connection.query( 'insert into user(name,passwd,submission_date) values(\'pig\',\'111111\',now())',function (err, result)  {
    var query =  connection.query( 'insert into user(name,passwd) values(?,?)',Params,function (err, result)  {
        if (err) throw err;
        console.log(result);
        connection.release();
    });
});
 */
pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("开始注册！");
    var author='zyy'


    var query = connection.query('SELECT * FROM note WHERE author=?',author, function (err, ret) {
            if (err) throw err;
            console.log(ret);
            console.log(ret[0].content);
            ret.forEach(function(v){
            console.log(v.content);
        });
    });

});