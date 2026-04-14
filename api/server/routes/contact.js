const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { v4: uuidv4 } = require('uuid');

// CREATE contact
router.post('/', async (req, res) => {
  try {
    const { name, company, role, email, notes } = req.body;

    const result = await pool.query(
      `INSERT INTO contacts (id, name, company, role, email, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [uuidv4(), name, company, role, email, notes],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 20');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
