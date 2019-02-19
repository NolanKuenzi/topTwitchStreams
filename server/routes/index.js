const path = require('path');
/* eslint-disable */
const router = require('express').Router();

router.get('*', (req, res) => {
  const route = path.join(__dirname, '..', '..', 'dist', 'index.html');
  res.sendFile(route);
});
module.exports = router;
