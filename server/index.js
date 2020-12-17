const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080

const dashboardRoutes = require('./routes/dashbordRoutes')
const tesseractRoutes = require('./routes/tesseractRoutes')
const goalRoutes = require('./routes/goalRoutes')

app.use(express.json())
app.use(cors())

//Express Routes
app.use('/dashboard', dashboardRoutes)
app.use('/tesseract', tesseractRoutes)
app.use('/goal', goalRoutes)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})
