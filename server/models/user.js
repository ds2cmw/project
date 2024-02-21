const Sequelize = require('sequelize'); // Sequelize 모듈을 가져오기.

class User extends Sequelize.Model { // User 클래스를 Sequelize 의 Model 클래스를 상속
    static initiate(sequelize) {  // initiate 메서드는 데이터베이스와 연결 설정 User 테이블 생성
        // 유저 테이블 기본 생성
        User.init ({
            // 닉네임
            nick : {
                type : Sequelize.STRING(15),
                allowNull : false,
            },
            // 나이
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false
            },
            // 이메일
            email : {
                type : Sequelize.STRING(40),
                allowNull : true,
                unique : true
            },
            // 비밀번호
            password : {
                type : Sequelize.STRING(100),
                allowNull : true
            },
        }, {
            sequelize,
            timestamps : true,
            underscoredIf : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        });
    }
    static associate(db) { // 모델 간 관계 설정
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
        // 1:N
        db.User.hasMany(db.Post);
        // N:N
    }
};

module.exports = User;