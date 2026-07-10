// Run with: npm run seed
// This creates the database tables (from schema.sql) and inserts a default admin user.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

async function seed() {
  try {
    const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    console.log('Creating tables...');
    await pool.query(schema);

    const name = process.env.ADMIN_NAME || 'System Administrator Account';
    const email = process.env.ADMIN_EMAIL || 'admin@storeratings.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@1234';
    const address = process.env.ADMIN_ADDRESS || 'Head Office, Admin Street, Admin City';

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, 'admin')`,
      [name, email, hashed, address]
    );

    console.log('Default admin user created:');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
