const Joi = require('joi')
const express = require('express')
const app = express()
const matches = require('./matches.json')
const teams = require('./teams.json')

app.use(express.json())

// landing page
app.get('/', (req, res) => {
    res.send('Hello World')
})

// to get all Teams
app.get('/teams', (req,res) => {
    res.send(teams)
})

// to get a single Team
app.get('/teams/:id', (req,res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id))

    if(!team){
        return res.status(404).send('The team is not found :(')
    } else {
        res.send(team)
    }
})

// to get all matches
app.get('/matches', (req,res) => {
    res.send(matches)
})

// to get a single match
app.get('/mcqs/:id', (req,res) => {
    const match = matches.find(c => c.id === parseInt(req.params.id))

    if(!match){
        return res.status(404).send('The match is not found :(')
    } else {
        res.send(match)
    }
})

// to create a match
app.post('/matches', (req,res) => {
    const {error} = validateMatches(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)   
    }

    const match = {
        id: matches.length + 1,
        city: req.body.city,
        date: req.body.date,
        teamA: req.body.teamA,
        teamB: req.body.teamB
    }

    matches.push(match)
    res.send(match)
})


// to update a Match
app.put('/matches/:id', (req,res) => {
    const match = matches.find(c => c.id === parseInt(req.params.id))
    if(!match){
        return res.status(404).send('The Match is not found :(')
    }

    const {error} = validateMatches(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    match.city = req.body.city
    match.date = req.body.date
    match.teamA = req.body.teamA
    match.teamB = req.body.teamB

    res.send(match)
})

// to delete a match
app.delete('/matches/:id', (req,res) => {
    const match = matches.find(c => c.id === parseInt(req.params.id))
    if(!match){
        return res.status(404).send('The Match is not found :(')
    }

    const index = matches.indexOf(match)
    matches.splice(index, 1)

    res.send(match)
})

// to validate the details of Matches
function validateMatches(match){
    const schema = Joi.object({
        city: Joi.string().min(5).required(),
        date: Joi.date().min(5).required(),
        teamA: Joi.string().min(6).required(),
        teamB: Joi.string().min(6).required()
    })
    return schema.validate(match)
}

// port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`))