const express = require('express');
const passport = require('passport');

// 사용자 로그인 되어 있는지 확인 여부 확인하는 함수 불러오기
const { isLoggedIn, isNotLoggedIn } = require('../middleweares/index');
// 회원가입, 로그인, 로그아웃 처리하는 함수 불러오기
const { join, login, logout } = require('../controllers/auth');

// 라우터 생성
const router = express.Router();

// post : auth/join 회원 가입 처리
router.post('/join', isNotLoggedIn, join);

// post : auth/ login 로그인 처리
router.post('/login', isNotLoggedIn, login);

// Get : auth/ logout 로그아웃 처리
router.get('/logout', isLoggedIn, logout);

module.exports = router;