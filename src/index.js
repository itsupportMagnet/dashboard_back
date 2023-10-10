import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));


app.use(express.json())

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
});
