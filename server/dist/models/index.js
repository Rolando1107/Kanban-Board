import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Render-specific SSL requirement
            },
        },
        logging: process.env.NODE_ENV !== 'production' ? console.log : false,
    })
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
export { sequelize, User, Ticket };
