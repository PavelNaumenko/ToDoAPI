module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ error: err.message });
  next(err);
};
