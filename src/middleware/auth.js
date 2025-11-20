export function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.usuario) return next();
  return res.redirect('/login');
}

export function ensureRole(role) {
  return (req, res, next) => {
    if (req.session?.usuario?.rol === role) return next();
    return res.status(403).send('No autorizado');
  };
}
