const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}))
const port = process.env.PORT || 8888
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
initRoutes(app)

app.use('/', (req, res) => { res.send('SEVER ON') })
app.listen(port, () => {
  console.log('Sever running on the port:' + port)
})