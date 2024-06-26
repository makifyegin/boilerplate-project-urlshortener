require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let original_url;
app.post('/api/shorturl', function(req, res) {
  const requestBody = req.body.url;
  const url = new URL(requestBody);
  original_url = url.href;
  dns.lookup(url.hostname, (err, address, family) => {
    if (err) {
      res.json({ error: 'invalid url' });
    } else {
      res.json({ original_url: original_url, short_url: 1 });
    }

    //When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
    
  
  
  });
});



app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;

res.redirect(original_url);


});





  
  
  


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
