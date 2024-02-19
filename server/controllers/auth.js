const passport = require('passport'); 
const bcrypt = require('bcrypt'); // 함호 해싱 함수를 제공하는 라이브러리
const User = require('../models/user'); // 유저 모델은 가져오기

exports.join = async (req, res, next) => {
    const { email, nick, age, password } = req.body;
    try {
        const exUser = await User.findOne({ where : {email}});
        if (exUser) {
            return res.redirect(`/join?error = exist`)
        }
        const hash = await bcrypt.hash(password, 13) // 입력받은 패스워드를 해시암호화 시키기
        await User.create({
            email,
            nick,
            age,
            password : hash,
        });
        return res.redirect('/');
    }
    catch(error) {
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        // 에러가 발생했을 경우
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        // 유저 정보가 없을경우 처리하는 방식
        if (!user) {
            return res.redirect(`/?loginError = ${info.message}`);
        }
        return req.login(user, (loginError) => {
            // 로그인이 정상적으로 처리될 수 없을 때
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/')
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
}
