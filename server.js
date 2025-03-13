const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for each page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/presentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'presentation.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/projets', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'projets.html'));
});

// Export the app for Vercel (no app.listen here!)
module.exports = app;