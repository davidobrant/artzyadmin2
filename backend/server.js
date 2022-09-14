require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/users')
const artistRoutes = require('./routes/artists')
const productRoutes = require('./routes/products')
const artworkRoutes = require('./routes/artworks')

app.use('/api/admin', adminRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/artwork', artworkRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => { console.log(`Connected to DB and server running on port ${port}`)})
    }).catch((err) => { console.error(err)})