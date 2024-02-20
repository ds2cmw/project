const express = require('express');
const commentController = require('../controllers/comments');

const router = express.Router();

// 뎃글 조회
router.post('/', commentController.createComment);
// 뎃글 수정
router.patch('/:id', commentController.updateComment);
// 뎃글 삭제
router.delete('/:id', commentController.deleteComment);

module.exports = router;