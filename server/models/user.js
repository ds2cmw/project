// models/user.js

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        if (db.Post) {
            db.User.hasMany(db.Post); // 수정된 부분: db.Post 모델을 올바르게 전달
        }
        if (db.Comment) {
            db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' }); // 수정된 부분: db.Comment 모델을 올바르게 전달
        }
    }
};
