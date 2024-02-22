const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

// 댓글 생성 함수
const createComment = async (req, res, next) => {
    try {
        // 새 댓글 생성하고 데이터 베이스에 저장
        const comment = await Comment.create({
            commenter: req.body.id,
            // 작성자 아이디
            comment: req.body.comment,
            // 댓글 내용
        });
        console.log(comment);
        res.status(201).json(comment);
        // 클라이언트에게 생성된 댓글 응답
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// 댓글 수정 함수
const updateComment = async (req, res, next) => {
    try {
        const result = await Comment.update(
            // 해당 id를 가진 댓글의 내용을 수정하고 데이터 베이스에 반영
            { comment: req.body.comment },
            // 수정된 댓글 내용
            { where: { id: req.params.id } }
            // 수정할 댓글의 id
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// 댓글 삭제 함수
const deleteComment = async (req, res, next) => {
    try {
        // 해당 id를 가진 댓글을 데이터베이스에서 삭제
        const result = await Comment.destroy({ where: { id: req.params.id } });
        // 삭제 결과 클라이언트에게 응답
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// POST /comments - 댓글 생성
router.post('/comments', createComment);

// PUT /comments/:id - 댓글 수정
router.put('/comments/:id', updateComment);

// DELETE /comments/:id - 댓글 삭제
router.delete('/comments/:id', deleteComment);

module.exports = router;
