import Usuario from '../models/Usuario.js';
import { Op } from 'sequelize';

// Controlador para cadastrar um novo usuário
export const cadastrarUsuario = async (req, res) => {
    const { nome, cpf, idade, email  } = req.body;

    if (!nome || !cpf || !idade || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const usuario = await Usuario.create({ nome, cpf, idade, email });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário', details: error.message });
    }
};


// Controlador para registrar uma doação
export const registrarDoacao = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        await usuario.registrarDoacao();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar doação', details: error.message });
    }
};

// Controlador para usuários sem doações
export const usuariosSemDoacoes = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { doacoes: 0 } });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários sem doações', details: error.message });
    }
};

// Controlador para usuários há 1 ano sem doação
export const usuariosUmAnoSemDoacao = async (req, res) => {
    try {
        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);
        const usuarios = await Usuario.findAll({
            where: { data_ultima_doacao: { [Op.lt]: umAnoAtras } }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários há 1 ano sem doação', details: error.message });
    }
};

// Controlador para usuários que já doaram
export const usuariosQueJaDoaram = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { doacoes: { [Op.gt]: 0 } } });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários que já doaram', details: error.message });
    }
};

// Controlador para faixa etária de usuários
export const faixaEtariaUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const faixaEtaria = {
            '18-24': usuarios.filter(u => u.idade >= 18 && u.idade <= 24).length,
            '25-59': usuarios.filter(u => u.idade >= 25 && u.idade <= 59).length,
            '60+': usuarios.filter(u => u.idade >= 60).length
        };
        res.json(faixaEtaria);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar faixa etária de usuários', details: error.message });
    }
};
