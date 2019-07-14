var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

// GET /comments/:id
router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /comments
router.post('/', function (req, res, next) {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      return Comment.populate(result, { path: 'commenter' });
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


// POST /comments
// router.post('/', async (req, res, next) => {
//   const comment = new Comment({
//     commenter: req.body.id,
//     comment: req.body.comment,
//   });
//   try {
//     const result = await comment.save();
//     return Comment.populate(result, { path: 'commenter' }); //
//     console.log('reachable code?');
//     res.status(201).json(result);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// 다큐먼트 수정
router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Comment.update({ _id: req.params.id }, { comment: req.body.comment });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 다큐먼트 삭제
router.delete('/:id', async (req, res, next) => {
  try {
   const result = await Comment.remove({ _id: req.params.id });
   res.json(result); 
  } catch (err) {
    console.error(err);
    next(err);
  };
});

module.exports = router;