var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET home page.
router.get('/', (req, res, next) => {
  User.find({})  // 사용자 전체 조회
    .then((users) => {  // 몽구스도 기본적으로 프로미스를 지원한다.
      // mongoose.pug를 렌더링할 때 users를 넣어준다.
      res.render('mongoose', users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
*/

/* async/await 문법으로 표현하면 다음과 같다. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find(); // User.find({})여야 할 것 같은데 아닌가...?
    res.render('mongoose', { users });
  } catch (error) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
