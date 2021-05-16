  const http = require("http");
const fs = require("fs");
var requests = require("requests");


const replaceVal = (tempVal, orgVal)=>{
  let temprature = tempVal.replace("{%tempval%}",orgVal.main.temp);
  temprature = temprature.replace("{%tempmin%}",orgVal.main.temp_min);
  temprature = temprature.replace("{%tempmax%}",orgVal.main.temp_max);
  temprature = temprature.replace("{%location%}",orgVal.name);
  temprature = temprature.replace("{%country%}",orgVal.sys.country);
  temprature = temprature.replace("{%tempstatus%}",orgVal.weather[0].main);
  return temprature;

  };

const homeFile= fs.readFileSync("home.html", "utf-8");
const server = http.createServer((req,res)=>{
   if(req.url=="/"){
    requests("http://api.openweathermap.org/data/2.5/weather?q=Jodhpur&appid=23535efd62afe86bd64f6e45c74eb9df",)
    .on('data', function (chunk) {
    const objData = JSON.parse(chunk);
    const arrData = [objData];
    const realTimeDate = arrData.map((val)=> replaceVal(homeFile, val)).join("");
    
    res.write(realTimeDate);
    
    })
    .on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);

    res.end();
    });
   }
});
server.listen(8000, "127.0.0.1");