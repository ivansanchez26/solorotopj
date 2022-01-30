const express = require('express')
const Character = require('../models/character')
const router = express.Router()

// All Character Route
router.get('/',async (req,res) =>{
    let searchOptions = {}
    if( req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const characters = await Character.find(searchOptions)
        res.render('characters/index', {
            characters: characters,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

//New Character Route
router.get('/new', (req,res) =>{
    res.render('characters/new', { character: new Character()})
})

//Create Character Route
router.post('/', async (req,res) =>{
    const character = new Character({
        name: req.body.name
    })
    try{
        const newCharacter = await character.save()
        res.redirect('/characters')
    }catch{
        res.render('characters/new',{
            character: character,
            errorMessage: 'Error creating character'
        })
    }
    
    
})

module.exports = router;