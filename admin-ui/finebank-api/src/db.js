const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('./config');

function createSequelize() {
  // Produksi (Railway/Render): PostgreSQL lewat DATABASE_URL
  if (config.databaseUrl) {
    return new Sequelize(config.databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: process.env.DATABASE_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : {},
    });
  }
  // Test: SQLite in-memory. Dev: SQLite file.
  let storage = ':memory:';
  if (!config.isTest) {
    storage = path.resolve(config.sqlitePath);
    fs.mkdirSync(path.dirname(storage), { recursive: true });
  }
  return new Sequelize({ dialect: 'sqlite', storage, logging: false });
}

module.exports = createSequelize();
