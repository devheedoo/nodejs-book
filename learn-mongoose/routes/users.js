var express = require('express');
var User = require('../schemas/User');

var router = express.Router();

// GET /users
router.get('/', function(req, res, next) {
  User.find({})
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

// POST /users
router.post('/', function(req, res, next) {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });
  user.save()
  .then((result) => {
    console.log(result);
    res.status(201).json(result);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

/* async/await */
// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /users
router.post('/', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });
  try {
    const result = await user.save();
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  };
});


module.exports = router;
