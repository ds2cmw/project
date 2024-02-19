const express = require('express');
const commentController = require('../controllers/comments');

const router = express.Router();

// POST /comments 댓글 생성
router.post('/', commentController.createComment);

// PATCH /comments/:id 댓글 수정
router.patch('/:id', commentController.updateComment);

// DELETE /comments/:id 댓글 삭제
router.delete('/:id', commentController.deleteComment);

module.exports = router;