/**
 * Created by DELL on 2016/5/3.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'mynote',
    password: '123456',
    database: 'mynote'
});

/*
connection.connect(function (err) {
    if (err) throw err;
    connection.query('SELECT * FROM user', function (err, ret) {
        if (err) throw err;
        console.log(ret);
        connection.end();
    });
});

connection.connect(function (err) {

    if (err) throw err;
    var value = 'zhangyaoyuan';
    var query =  connection.query('SELECT * FROM user where name="'+value+'"', function (err, ret) {
        if (err) throw err;
        console.log(ret);
        connection.end();
    });
    console.log(query.sql);
});
 */
connection.connect(function (err) {
    if (err) throw err;
    var value = 'zhangyaoyuan';
    var query =  connection.query('SELECT * FROM user where name=?',value, function (err, res) {
        if (err)
            throw err;
        console.log(res);

        if(res!='') {
            var temp = new String(res[0].passwd);
            console.log("不为空");
            if(temp=='111111')
            console.log('验证成功');
        }
        connection.end();
    });
    console.log(query.sql);
});