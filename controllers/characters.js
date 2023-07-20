const Character = require('../models/character');

module.exports = {
    index,
    new: newCharacter,
    create,
  };

  async function index(req, res) {
    const characters = await Character.find({});
    res.render('characters/index', { title: 'All Characters', characters });
  }


  function newCharacter(req, res) {
    res.render('characters/new', { title: 'Add Character', errorMsg: '' });
  }

  async function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }

    const character = new Character(req.body);
    try {
      await character.save()
      res.redirect(`/characters`);
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('characters/new', { errorMsg: err.message });
    }
  }