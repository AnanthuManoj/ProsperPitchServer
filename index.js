//import dot env file
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//improt router
const router = require('./Routing/router')

//import connection
require('./DataBaseConnection/connection')

//create server
const ppserver = express()

//use cors 
ppserver.use(cors())



//parsing json
ppserver.use(express.json())

ppserver.use(router)

ppserver.use('/upload',express.static('./uploads'))

//set port
const port = 3001 || process.env

//run server
ppserver.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})