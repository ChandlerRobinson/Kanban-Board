"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.UserFactory = UserFactory;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    // Hash the password before saving the user
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            this.password = yield bcrypt_1.default.hash(password, saltRounds);
        });
    }
}
exports.User = User;
function UserFactory(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: (user) => __awaiter(this, void 0, void 0, function* () {
                yield user.setPassword(user.password);
            }),
            beforeUpdate: (user) => __awaiter(this, void 0, void 0, function* () {
                yield user.setPassword(user.password);
            }),
        }
    });
    return User;
}
