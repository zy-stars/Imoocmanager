const {createProxyMiddleware} = require("http-proxy-middleware");
    module.exports = function(app){
        app.use(
            createProxyMiddleware("/weather",{
                target: "https://api.seniverse.com/v3/weather/now.json?key=SQK5GvgsfUcKezphV&location=beijing&language=zh-Hans&unit=c",
                changeOrigin:true,
                pathRewrite:{
                "^/weather":""
                }
            })
        )
    }