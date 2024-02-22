const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 회원가입 라우터, /auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick,password } = req.body;
    try {
        const exUser = await User.findOne({ where: {email}});  // User db에 같은 email이 있는지 확인  
        if(exUser){ // 이미 User가 존재하면
            return res.redirect('/join?error=exist'); // 주소 뒤에 에러를 쿼리스트링으로 표시
        }
        // User이 존재하지 않으면(회원가입 가능)
        const hash = await bcrypt.hash(password, 13);
        await User.create({
            email,
            nick,
            age : 0,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// 로컬 로그인 라우터, /auth/login
router.post('/login', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local', (authError, user, info) => { 
        if(authError){ 
            console.error(authError);
            return next(authError);
        }
        if(!user){  
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { 
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); 
});

// 로그아웃 라우터, /auth/logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(); // req.user 객체를 제거함
    req.session.destroy(); // req.session 객체의 내용을 제거함 -  세션 정보를 지움
    res.redirect('/'); // 메인 페이지로 돌아감
});

module.exports = router;