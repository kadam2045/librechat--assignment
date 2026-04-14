///Fetch last 10 contacts and  we will send to AI
const { pool } = require('../db');

const getRecentContacts = async () => {
  const result = await pool.query(
    'SELECT name, company, role FROM contacts ORDER BY created_at DESC LIMIT 10',
  );

  return result.rows;
};

module.exports = { getRecentContacts };

//Format contacts for prompt
const formatContacts = (contacts) => {
  if (!contacts.length) return 'No contacts found.';

  return contacts.map((c) => `Name: ${c.name}, Company: ${c.company}, Role: ${c.role}`).join('\n');
};

module.exports = { getRecentContacts, formatContacts };

//thisb will output like this:
//Name: John Doe, Company: Google, Role: Software Engineer
//Name: Jane Smith, Company: Microsoft, Role: Product Manager
