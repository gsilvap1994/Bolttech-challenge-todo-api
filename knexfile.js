// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'bolttech_challenge_user',
      password: 'bolttech_challenge_pw!123',
      database: 'bolttech_challenge_db'
    },
    migrations: {
      directory: 'database/migrations'
    }
  }
};
