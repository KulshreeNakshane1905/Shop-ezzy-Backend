// For demo: expects ?admin_token=SECRET_TOKEN in query or x-admin-token header
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'supersecrettoken';

module.exports = function (req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.admin_token;
  if (token === ADMIN_TOKEN) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Admin access required.' });
}; 