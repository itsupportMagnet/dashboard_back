import express from 'express';
import cors from 'cors'
import router from './routes/dashboard.routes.js'

const { webLink } = process.env

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
  
});

app.use(express.json())
app.use(router);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
});
