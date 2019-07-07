const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  console.log('req.body:', email, nick, password);
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      // 이미 해당 이메일 주소가 있는 경우
      req.flash('joinError', 'The email address is already joined.');
      return res.redirect('/join');
    }
    // 이메일 주소가 중복되지 않아 사용자 생성(가입))
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    // 과정 중 오류 발생
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      // authError 인자가 null이 아닌 경우 = 인증 실패
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // 사용자ID 없는 경우
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    // passport는 req에 login, logout 메서드를 추가한다.
    // req.login은 user 객체를 인자로 사용해 passport.serializeUser를 호출한다.
    return req.login(user, (loginError) => {
      if (loginError) {
        // 로그인 프로세스 중 오류
        console.error(loginError);
        return next(loginError);
      }
      // 정상 로그인
      return res.redirect('/');
    })
  })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;