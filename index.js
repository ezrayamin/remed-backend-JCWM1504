require('dotenv').config()
const express = require('express') // pembuat server pengganti http module
const bodyParser = require('body-parser') // untuk menampung req.body
const cors = require('cors') // izin sharing data
// const mysql = require('mysql') // untuk sambungin api dengan mysql database

// create app
const app = express()
// apply middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('./public'))

// import connection
const db = require('./database')
db.connect((err) => {
    if (err) return console.log(`connecting error : ${err.stack}`)
    console.log(`connected as id : ${db.threadId}`)
})

// create home route
app.get('/', (req, res) => {
    res.status(200).send('<h1>this is home</h1>')
})

// import router
const {clientRouter, adminRouter} = require('./routers')
app.use('/sales', clientRouter)
app.use('/admin', adminRouter)
// app.use('/profile', profileRouter)
// app.use('/category', categoryRouter)

const port = 2000
app.listen(port, () => console.log(`connected to port ${port}`))