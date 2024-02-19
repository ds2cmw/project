const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize) {
        // 해시테그 테이블 기본 생성
        Hashtag.init ({
            tag : {
                type : Sequelize.STRING(200),
                allowNull : false,
                unique : true
            }
        }, {
            sequelize,
            timestamps : true,
            underscoredIf : false,
            modelName : 'Hashtag',
            tableName : 'hashtags',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci' 
        })
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through : 'PostHashtag'})
    }
};

module.exports = Hashtag;