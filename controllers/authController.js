const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const stmt = `INSERT INTO users (email, password) VALUES (?, ?)`;
  db.run(stmt, [email, hashed], function (err) {
    if (err) return res.status(400).json({ msg: 'Email already exists' });
    res.status(201).json({ msg: 'Signup successful' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const stmt = `SELECT * FROM users WHERE email = ?`;

  db.get(stmt, [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};
