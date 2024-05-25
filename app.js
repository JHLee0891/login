import express from 'express';
import connect from './schemas/index.js';
import dotenv from 'dotenv';
import CharacterRouter from './routes/characters.routes.js';
import ItemsRouter from './routes/items.routes.js';

dotenv.config();

const app = express();
const PORT = 4000;
connect();

// 기본적인 crud 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.get('/', (req, res) => {
  return res.json({ message: 'API Index Page' });
});

app.use('/api', [router, CharacterRouter, ItemsRouter]);

app.listen(PORT, () => {
  console.log(PORT, 'The Server is opened on Port');
});
