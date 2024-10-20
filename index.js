import express from 'express'
import cors from 'cors';
import bodyParser  from 'body-parser';
import usuarioRoutes from './routes/usuarioRoute.js'
import { sequelize } from './config/database.js'; 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        app.use('/usuarios', usuarioRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();