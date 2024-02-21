// 로그인 된 상태를 확인하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
    // 로그인이면 허용
    if (req.isAuthenticated()) {
        // req.isAuthenticated() 로그인 중이면 true, 아니면 false
        next();
        // 다음 미들웨어로 넘김
    }
    else {
        // 로그인이 아니면 허용 안함
        res.status(403).send('로그인 필요')
    }
};

// 로그인이 되지 않은 상태를 확인하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
    // 로그인이 아니면 허용
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // 로그인이면 허용
        const message = encodeURIComponent('로그인한 상태 입니다')
        res.redirect(`/?error=${message}`)
        // 에러 페이지로 바로 이동
    }
}