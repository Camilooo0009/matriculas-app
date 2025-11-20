import express from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import mainRoutes from './routes/index.js';
import ejsLayouts from 'express-ejs-layouts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 }
  })
);

// Views & static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Expose user to views
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/', mainRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('layout', { title: 'No encontrado', body: '<div class="p-6">Página no encontrada</div>' });
});

// Start
const PORT = process.env.PORT || 3000;
initDb();
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
