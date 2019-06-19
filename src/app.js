const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views locatiom
app.set('view-engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather-app',
        name : 'Mukesh-Bhatia'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title : 'About',
        name : 'Mukesh-Bhatia'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title : 'Help',
        name : 'mukesh.bhatia85@gmail.com'
    })
})

app.get('/', (req, res) => {
    res.render('help.hbs', {
        title : 'Help',
        name : 'mukesh.bhatia85@gmail.com'
    })
})

app.get('/favicon.ico', (req, res) => {
    res.render('help.hbs', {
        title : 'Help',
        name : 'mukesh.bhatia85@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address '
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
       if (error) {
           return res.send({ error })
       } 

       forecast (latitude, longitude, (error, forecastData) => {
           if (error){
               return res.send({ error })
           }

           res.send({
               forecast: forecastData,
               location,
               address: req.query.address

           })
       })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search string'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs',{
        title : '404',
        name: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Mukesh Bhatia',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})