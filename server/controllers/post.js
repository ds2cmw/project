const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag } = require('../models');

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, cb) {
            // 파일 저장 경로 설정
            cb(null, 'uploads/');
            // 'uploads/' 폴더에 저장
        },
        filename(req, file, cb) {
            // 파일 이름 설정
            const ext = path.extname(file.originalname);
            // 파일 확장자 가져오기
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            // 현재 시간으로 파일 이름 추가하여 중복 방지
        }
    })
});

exports.uploadImage = (req, res) => {
    // 데이터를 라우터 처리 함수
    upload.single('img')(req, res, (err)=> {
        // 파일 하나를 업로드 하여 업로드가 끝나면 콜백 함수 실행
        if (err) {
            console.error(err);
            return res.status(400).json({ error: '이미지 업로드 실패'});
        }
        console.log(req.file);
        res.json({url : `/img/${req.file.filename}`});
        // 클라이언트에게 업로드된 이미지를 url로 응답
    })
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content : req.body.content,
            // 요청한 본문에 게시글 내용 데이터베이스에 저장
            img : req.body.img,
            // 요청한 본문에 이미지 를 데이터 베이스에 저장
            UserId : req.user.id
            // 현재 사용한 아이디를 게시글을 작성자로 설정
        });
        const Hashtags = req.body.content.match(/#[^\s#]+/g);
        // 게시글 내용에서 해시테그를 추출
        if (Hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        // 데이터베이스에 해시태그를 저장& 중복확인
                        where : {title : tag.slice(1).toLowerCase()}
                        // 해시태그 문자열에서 #제거 하고 소문자로 변환 저장
                    })
                })
            );
            await post.addHashtags(result.map( r => r[0]));
            // 게시글과 해시태그를 연결
        }
        res.redirect('/');
    }
    catch (error) {
        console.error(err);
        next(err)
    }
}
