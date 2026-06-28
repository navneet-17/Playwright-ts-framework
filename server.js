const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('demo_apps')) // ✅ Serve HTML files;
app.use(cors());
// highlight-start
app.use(bodyParser.json()); // Use the json parser from the default import
// highlight-end

let users = []; // In-memory user list

// API: GET users
app.get("/users", (req, res) => {
  res.json(users);
});

// API: POST new user
app.post("/users", (req, res) => {
  // Destructure all four fields from the request body
  const { name, profile, skills, location } = req.body;

  const id = users.length + 1;

  // Create the new user object with all fields
  const newUser = { id, name, profile, skills, location };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));