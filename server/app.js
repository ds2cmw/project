// 필요한 패키지들 가져오기
const express = require('express'); // Express 웹 애플리케이션을 만들기 위한 패키지
const cookieParser = require('cookie-parser'); // 쿠키를 파싱하기 위한 패키지
const morgan = require('morgan'); // HTTP 요청 로깅을 위한 패키지
const path = require('path'); // 파일 경로를 조작하기 위한 패키지
const session = require('express-session'); // 세션 관리를 위한 패키지
const dotenv = require('dotenv'); // 환경 변수를 로드하기 위한 패키지
const passport = require('passport'); // 사용자 인증을 처리하기 위한 패키지

// .env 파일에서 환경 변수를 로드합니다.
dotenv.config();

// Express 애플리케이션을 생성합니다.
const app = express();
// passport 설정을 담고 있는 모듈을 가져오기
const passportConfig = require('./passport');
// 함수 호출 하고 passport 설정을 초기화하고 local strategy 인증 구성 초기화
passportConfig();

// 포트 설정
app.set('port', process.env.PORT || 3888);
// 모델즈 파일에 sequelize 객체를 가져와서 데이터베이스와 연결
const { sequelize } = require('./models');
// sequelize 객체의 sync 메서드를 호출 하고 데이터베이스에 없으면 태이블 생성 있으면 변경 하지 않는다.
sequelize.sync({ force : false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch ((err) => {
    console.error(err);
})

// 미들웨어 설정
app.use(morgan('dev')); // 개발 환경에서의 HTTP 요청 로깅
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공을 위한 미들웨어
app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 데이터 파싱을 위한 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 파싱하기 위한 미들웨어

// 세션 미들웨어 설정
app.use(session({
    resave : false, // 요청이 왔을 때 세션에 수정 사항이 생겼더라도 세션을 다시 저장하지 않음
    saveUninitialized : false, // 세션에 저장할 내역이 없더라도 세션을 저장하지 않음
    secret : process.env.COOKIE_SECRET,  // 세션 암호화를 위한 키
    cookie : {
        httpOnly : true,  // 클라이언트에서 쿠키를 확인할 수 있도록 설정
        secure : false  // HTTPS가 아닌 환경에서도 사용 가능하도록 설정
    }
}));
app.use(passport.initialize()); // 패스포트 초기화
app.use(passport.session());  // 패스포트 세션 사용

// /auth 라우터는 auth.js 파일로 관리
const authRouter = require('./routes/auth');
// /comment 라우터는 comment.js 파일로 관리
const commentRouter = require('./routes/comment');

app.use('/auth', authRouter);
app.use('/', commentRouter);

// 라우터가 없는 경우 404 오류를 처리하는 미들웨어
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 핸들링을 위한 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error'); // 에러 페이지 렌더링
});

// 서버를 특정 포트에서 실행
const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(PORT, '번 포트에서 대기 중');
});
