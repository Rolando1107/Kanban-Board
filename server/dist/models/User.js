var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// Define the User class extending Sequelize's Model
export class User extends Model {
    // Method to hash and set the password for the user
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            this.password = yield bcrypt.hash(password, saltRounds);
        });
    }
}
// Define the UserFactory function to initialize the User model
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password cannot be empty.'
                }
            }
        },
    }, {
        tableName: 'users', // Name of the table in PostgreSQL
        sequelize, // The Sequelize instance that connects to PostgreSQL
        hooks: {
            // Before creating a new user, hash and set the password
            beforeCreate: (user) => __awaiter(this, void 0, void 0, function* () {
                yield user.setPassword(user.password);
            }),
            // Before updating a user, hash and set the new password if it has changed
            beforeUpdate: (user) => __awaiter(this, void 0, void 0, function* () {
                if (user.changed('password')) {
                    yield user.setPassword(user.password);
                }
            }),
        }
    });
    return User; // Return the initialized User model
}
