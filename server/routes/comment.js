const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

// 댓글 생성
router.post('/create', commentController.createComment);

// 댓글 수정
router.put('/:id/update', commentController.updateComment);

// 댓글 삭제
router.delete('/:id/delete', commentController.deleteComment);

module.exports = router;
