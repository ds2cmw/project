const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        // 게시판 테이블 기본 생성
        Post.init({
            // 컨텐츠
            content : {
                type : Sequelize.STRING(200),
                allowNull : false
            },
            // 이미지
            img : {
                type : Sequelize.STRING(200),
                allowNull : true
            },
            // 제목
            title : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            // 지역 정보
            local_information : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            // 테그
            tag : {
                type : Sequelize.STRING(20),
                allowNull : true
            }
        }, {
            sequelize,
            timestamps : true,
            underscoredIf : false,
            modelName : 'Post',
            tableName : 'posts',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci'
        })
    }
    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'})
    }
};

module.exports = Post;