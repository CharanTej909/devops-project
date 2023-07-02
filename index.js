const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Endpoint for rendering the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Endpoint for shortening URLs
app.post('/shorten', (req, res) => {
  // Generate a unique short code for the URL
  const shortCode = generateShortCode();

  // Save the short code and the original URL in a database or file
  // For simplicity, we'll just store it in an object
  urlDatabase[shortCode] = req.body.url;

  // Return the shortened URL to the client
  const shortenedUrl = `http://localhost:${PORT}/${shortCode}`;
  res.render('shortened', { shortenedUrl });
});

// Endpoint for redirecting to the original URL
app.get('/:shortCode', (req, res) => {
  // Retrieve the original URL from the database or file using the short code
  const originalUrl = urlDatabase[req.params.shortCode];

  // If the short code exists, redirect to the original URL; otherwise, return a 404 error
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

// Generate a random short code (6 characters long)
function generateShortCode() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortCode = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortCode += characters.charAt(randomIndex);
  }
  return shortCode;
}

// In-memory database for storing URLs
const urlDatabase = {};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
