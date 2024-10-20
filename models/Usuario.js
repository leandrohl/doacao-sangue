import {  DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 

const Usuario = sequelize.define('Usuario', {
    nome: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    idade: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    doacoes: { type: DataTypes.INTEGER, defaultValue: 0 },
    data_ultima_doacao: { type: DataTypes.DATE }
}, {
    tableName: 'usuarios',
    timestamps: false
});

Usuario.prototype.registrarDoacao = async function() {
    this.doacoes += 1;
    this.data_ultima_doacao = new Date();
    await this.save();
};

export default Usuario;
