/**
 * Created by hxc on 2017/3/5.
 */
/*用于手机界面调整*/
/*node server 手机打开本机ip:3001/dist/index.html*/
var express = require('express');

var app = express();
var fs = require('fs');
var path = require('path');



var resolve = file => path.resolve(__dirname, file);

app.use('', express.static(resolve('./dist')));

app.listen(3003,function(){
    console.log('监听成功,port3003');
});
