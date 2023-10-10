import express from 'express';
import cors from 'cors'
import router from './routes/dashboard.routes'

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));


app.use(express.json())
app.use(router);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
});
