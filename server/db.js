const { Pool } = require("pg");
var fs = require("fs");

const pool = new Pool({
  host: process.env.CLIENT_URL,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.CLIENT_PORT,
  database: process.env.POSTGRES_DATABASE,
});

async function initailizeDatabase() {
  await pool.query(`CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        text TEXT NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT now(),
        likes integer DEFAULT 0 NOT NULL,
        image TEXT
        );
        `);
  json = JSON.parse(fs.readFileSync(__dirname + "/comments.json", "utf8"));
  await fillDatabase(json["comments"]);
}

async function fillDatabase(comments) {
  comments.forEach(async (user) => {
    await pool.query(
      `INSERT INTO comments (id, author, text, date, likes, image) 
      VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
      [user.id, user.author, user.text, user.date, user.likes, user.image],
    );
  });
  pool.query(`SELECT setval('comments_id_seq', max(id)) FROM comments`);
}

initailizeDatabase();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
