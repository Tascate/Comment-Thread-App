const express = require("express");
require("dotenv").config();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//get text
app.get("/comments", async (req, res) => {
  const result = await db.query("SELECT * from comments ORDER BY date DESC");
  res.json({ comments: result.rows });
});

//add comment
app.post("/comments", async (req, res) => {
  req = req.body;
  const data = [req.author, req.text, new Date().toISOString(), req.image];
  try {
    const result = await db.query(
      `INSERT INTO comments (author, text, date, image) 
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      data,
    );
    res.json({ comment: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

//edit text
app.put("/comments/:id", async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE comments SET text = ($1) WHERE id = ($2) RETURNING *`,
      [req.body.text, req.params.id],
    );
    res.json({ comment: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

//delete comment
app.delete("/comments/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM comments WHERE id = ($1)`, [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
