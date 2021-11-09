const path = require("path")
const { response } = require("express")
const express = require("express")
const hbs = require("hbs");
const { Http2ServerRequest } = require("http2");
const weather = require("./weather")
const app = express()

//Define paths for Express config
app.use(express.static(path.join(__dirname, "../public")))
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather",
        name :"Ujjwal Agarwal"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About Me",
        name: "Ujjwal Agarwal"
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        helpText: "This is some hepful text", 
        title: "Help",
        name: "Ujjwal Agarwal"
    })
})

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Ujjwal Agarwal",
        errorMessage: "Help article not found"
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })   
    }
    weather(req.query.address, (error, response)=>{
        if(error){
            return res.send({error: error})
        }
        res.send({
            forecast: response,
            location: req.query.address
        })
    })
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("*", (req,res)=>{
    res.render("404", {
        title: 404,
        name: "Ujjwal Agarwal",
        errorMessage: "Page not found"
    })
})


// app.set('views', path.join(__dirname, '../templates/views'));
// hbs.registerPartials(path.join(__dirname, "../templates/partials"))
// app.use(express.static(path.join(__dirname + "../public/css")))
// app.get("/", (req, res) => {
//     // res.render("index", {
//     //     title: "Weather App",
//     //     name: "Andrew"
//     // })
//     res.send(`<h1>Weather</h1>`)
// })
// app.get("/about", (req, res) => {
//     res.render("about", {
//         title: "About me",
//         name: "Andrew Mead"
//     })
// })

// app.get("/help", (req, res) => {
//     res.render("help", {
//         title: "Help give",
//         name: "Andrew Mead"
//     })
// })
// // app.get("/", (req, res) => {                 //req us object and res
// //     res.send("<h1>Home</h1>")
// // })

// // app.get("/help", (req, res) => {
// //     res.send([{
// //         name: "Andrew",
// //         age: 27
// //     }])
// //     res.send(app.use(express.static(path.join(__dirname, "../public"))))
// // })

// // app.get("/about", (req, res) => {
// //     res.send("About")
// // })

// app.get("/weather", (req, res) => {
//     res.send("Weather")
// })

// app.get("/help/*", (req, res) => {
//     res.render("404", {
//         title: "404",
//         name: "Andrew",
//         errorMessage: "Help article not found"
//     })

// })
// app.get("*", (req, res) => {
//     res.render("404", {
//         title: "404",
//         name: "Andrew",
//         errorMessage: "Page Not found"
//     })

// })
//app.com
//app.com/help
//app.com/about


app.listen(3000, () => {
    console.log("Server is up");
})