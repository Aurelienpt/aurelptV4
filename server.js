const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques (CSS, images, etc.) depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes pour chaque page
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

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});