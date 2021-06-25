const express = require('express')
const router = express.Router()
const teams = require('../teams.json')

// to get all Teams
router.get('/', (req,res) => {
    res.send(teams)
})

// to get a single Team
router.get('/:id', (req,res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id))

    if(!team){
        return res.status(404).send('The team is not found :(')
    } else {
        res.send(team)
    }
})

module.exports = router