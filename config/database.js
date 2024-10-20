import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('doacao_sangue', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307'
});