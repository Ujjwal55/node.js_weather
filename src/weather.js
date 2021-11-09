const request = require("postman-request")
const weather = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=d9cbdff7ada63d35bc074100855f95ed`
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback(`unable to connect to service`, undefined);
        }
        else if(response.body.message){
            callback(`unable to find location, please choose another location`, undefined);
        }
        else{
            callback(undefined, `The current temperature is ${response.body.main.temp} but it feels like ${response.body.main.feels_like} and has ${response.body.weather[0].description}`);
        }
    })
}

module.exports = weather
// weather(`${address}`, (error, response)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(response);
//     }
// })
