const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// passport-local 모듈의 전략 생성자를 가져옴
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => { // 이 모듈을 내보냅니다.
    passport.use(new LocalStrategy({ // Passport에 새로운 LocalStrategy를 등록
        usernameField : 'email', // 사용자명 필드를 이메일로 설정
        passwordField : 'password', // 비밀번호 필드를 패스워드로 설정
        passReqToCallback : false, // 요청 객체를 콜백 함수로 전달하지 않는다
    }, async(email, password, done) => { // 인증 처리를 위한 콜백 함수를 정의합니다.
        try {
            const exUser = await User.findOne({ where : {email}}); // 이메일로 사용자를 찾는다
            if (exUser) { // 사용자가 존재하는 경우 
                const result = await bcrypt.compare(password, exUser.password); // 입력된 비밀번호를 해싱된 비밀번호와 비교
                if (result) { // 비밀번호가 일치하는 경우
                    done(null, exUser);
                }
                else { // 비밀번호가 일치하지 않는 경우
                    done(null, false, {message : '비밀번호가 일치하지 않습니다.'});// 인증 실패 메시지를 전달
                }
            }
            else { // 사용자가 존재하지 않는 경우
                done(null,false, {message : '가입되지 않은 회원입니다'}); // 인증 실패 메시지를 전달
            }
        }
        catch(error) { // 에러 처리
            console.error(error);
            done(err);
        }
    }));
};