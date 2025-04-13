const db = require('../db/database');

exports.getCategories = (req, res) => {
  db.all(`SELECT * FROM categories`, [], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Error fetching categories' });
    res.json(rows);
  });
};

exports.addCategory = (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  const stmt = `INSERT INTO categories (name, itemCount, imageUrl) VALUES (?, ?, ?)`;

  db.run(stmt, [name, itemCount, imageUrl], function (err) {
    if (err) return res.status(400).json({ msg: 'Insert failed' });

    res.status(201).json({
      id: this.lastID,
      name,
      itemCount,
      imageUrl,
    });
  });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, itemCount, imageUrl } = req.body;
  const stmt = `UPDATE categories SET name = ?, itemCount = ?, imageUrl = ? WHERE id = ?`;

  db.run(stmt, [name, itemCount, imageUrl, id], function (err) {
    if (err) return res.status(400).json({ msg: 'Update failed' });

    res.json({ id, name, itemCount, imageUrl });
  });
};
