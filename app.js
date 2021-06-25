const Joi = require('joi')
const express = require('express')
const app = express()
const matches = require('./routes/matches')
const teams = require('./routes/teams')

app.use(express.json())
app.use('/matches', matches)
app.use('/teams', teams)

// port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`))