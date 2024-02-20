const { Comment } = require('../models/'); // 모델 가져오기

exports.createComment = async (req, res, next) => {
    try {
        // 새 댓글을 생성
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const result = await Comment.update(
            { comment: req.body.comment },
            { where: { id: req.params.id } }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const result = await Comment.destroy({ where: { id: req.params.id } });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
