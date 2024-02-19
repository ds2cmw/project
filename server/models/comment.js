const Sequelize = require('sequelize'); // 모듈 가져오기

class Comment extends Sequelize.Model { //Comment 클래스를 Sequelize 의 Model 클래스를 상속
    static initiate(sequelize) {  // 데이터 베이스와 연결 설정
        // 댓글 테이블 기본 생성
        Comment.init ({
            comment : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            created_at : {
                type : Sequelize.DATE,
                allowNull : true,
                defaultValue : Sequelize.NOW
            }
        }, { // 옵션 설정
            sequelize,
            timestamps : false,
            modelName : 'Comment',
            tableName : 'comments',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    }
};

module.exports = Comment;