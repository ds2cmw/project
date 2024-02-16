const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');


dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

// 미들웨어 설정
app.use(morgan('dev'));
// upblic 폴더 안의 파일 사용
app.use(express.static(path.join(__dirname, 'public')));
// json 형태의 요청 body를 파싱하려고 사용
app.use(express.json());
// url 한글 인코딩 허용
app.use(express.urlencoded({ extended: false }));
// .env 파일의 COOKIE_SECRET 파일 사용
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave : false,  // 모든 request마다 기존에 세션에 변경사항이 없을 시에도 세션을 다시 저장
    saveUninitialized : false,  // request가 들어오면 saveUninitialized 상태의 세션을 강제로 저장 해제
    secret : process.env.COOKIE_SECRET,  // 암호화 하는데 쓰일 키
    cookie : {
        httpOnly : true,  // 자바스크립트로 쿠키에 접근하지 못하게 할 때 사용
        secure : false  // https 로만 사용하게 할 때 사용
    }
}));
app.use(passport.initialize()); // passport 초기화
app.use(passport.session());  // passport 세션 사용

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(PORT, '번 포트에서 대기 중');
});
