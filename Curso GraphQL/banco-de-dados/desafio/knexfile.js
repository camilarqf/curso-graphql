// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    database: "desafio_cap_04",
    user: "default",
    password: "secret",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
