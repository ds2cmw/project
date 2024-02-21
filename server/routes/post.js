const express = require('express');

const postController = require('../controllers/post');
const { isLoggedIn } = require('../middleweares/index')

const router = express.Router();

router.get('/img', isLoggedIn, postController.uploadImage);
// 이미지 업로드 처리 라우터
router.get('/', isLoggedIn, postController.uploadPost);
// 게시글 업로드 처르 라우터

module.exports = router;