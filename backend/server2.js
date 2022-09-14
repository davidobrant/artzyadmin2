require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT2 = process.env.PORT2 || 4000

app.use(express.json())



// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     app.listen(port, () => { console.log(`Connected to DB and server running on port ${port}`)})
// }).catch((err) => { console.error(err)})

app.listen(PORT2, () => {
    console.log(`Server running on port ${PORT2}`)
})