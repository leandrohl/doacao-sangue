import express from 'express';
import { 
    registrarDoacao, 
    cadastrarUsuario, 
    usuariosSemDoacoes, 
    usuariosUmAnoSemDoacao, 
    usuariosQueJaDoaram, 
    faixaEtariaUsuarios 
} from '../controllers/usuarioController.js';

const router = express.Router();

// Rota para cadastro de usuário
router.post('/', cadastrarUsuario);

// Rota para realizar doação de sangue
router.post('/doacao/:id', registrarDoacao);

// Relatórios
router.get('/sem-doacoes', usuariosSemDoacoes);
router.get('/um-ano-sem-doacao', usuariosUmAnoSemDoacao);
router.get('/ja-doaram', usuariosQueJaDoaram);
router.get('/faixa-etaria', faixaEtariaUsuarios);

export default router;