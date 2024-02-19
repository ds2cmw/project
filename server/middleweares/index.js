// 로그인이 되었을 때 할 작업들 넣기
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send('로그인 필요')
    }
};

// 로그인이 안되었을 때 할 작업들 넣기
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        const message = encodeURIComponent('로그인한 상태 입니다')
        res.redirect(`/?error=${message}`)
    }
}