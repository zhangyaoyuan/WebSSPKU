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

connection.connect(function (err) {
    if (err) throw err;

    var Params = ['Wilson3','111111'];
    //var query =  connection.query( 'insert into user(name,passwd,submission_date) values(\'pig\',\'111111\',now())',function (err, result)  {
    var query =  connection.query( 'insert into user(name,passwd) values(?,?)',Params,function (err, result)  {
        if (err) throw err;
        console.log(result);
        connection.end();
    });
    console.log(query.sql);
});
