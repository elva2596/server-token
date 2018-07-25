const express = require("express");
const app = express();
const config =  require("./config/default.js")
const db = require('./mongodb')
const bodyParser = require("body-parser")
const routes = require('./routes')
const dotenv = require('dotenv')
const compression = require('compression');
dotenv.config()
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

/*

 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");//预检请求使用
    next();
});

routes(app)
app.set("port",config.port);
app.listen(app.get('port'),()=>{
  console.log(`Express server is listening port: ${config.port}`);
})
