import { Router } from 'express';
import { ensureAuthenticated, ensureRole } from '../middleware/auth.js';

const router = Router();

router.get('/', ensureAuthenticated, (req, res) => {
  const rol = req.session.usuario.rol;
  if (rol === 'admin') return res.redirect('/dashboard/admin');
  if (rol === 'docente') return res.redirect('/dashboard/docente');
  return res.redirect('/dashboard/estudiante');
});

router.get('/dashboard/admin', ensureAuthenticated, ensureRole('admin'), (req, res) => {
  res.render('dashboard_admin', { title: 'Panel Administrador' });
});

router.get('/dashboard/docente', ensureAuthenticated, ensureRole('docente'), (req, res) => {
  res.render('dashboard_docente', { title: 'Panel Docente' });
});

router.get('/dashboard/estudiante', ensureAuthenticated, ensureRole('estudiante'), (req, res) => {
  res.render('dashboard_estudiante', { title: 'Panel Estudiante' });
});

export default router;
