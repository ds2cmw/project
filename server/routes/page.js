const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); // 구조분해할당으로 middlewares의 두 미들웨어를 가져옴

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보'});
});

router.get('/join', isNotLoggedIn, (req, res)=>{
    res.render('join', {title: '회원가입'});
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'sns',
    });
});

module.exports = router;