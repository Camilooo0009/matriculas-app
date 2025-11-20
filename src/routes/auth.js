import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';

const router = Router();

router.get('/login', (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('login', { title: 'Iniciar sesión', layout: false });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  if (!user) return res.render('login', { title: 'Iniciar sesión', error: 'Credenciales inválidas', layout: false });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.render('login', { title: 'Iniciar sesión', error: 'Credenciales inválidas', layout: false });
  req.session.usuario = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
  return res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
