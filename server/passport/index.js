const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    // serializeUser 함수사용 하여 식별자 id로 직렬화 하여 사용자 id 저장
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // deserializeUser 함수사용 하여 사용자 id를 이용하여 객체복원
    passport.deserializeUser((id, done) => {
        User.findOne({ where : {id}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    
    local();
};