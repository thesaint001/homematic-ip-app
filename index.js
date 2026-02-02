require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/info', (req, res) => {
  res.json({
    id: process.env.PLUGIN_ID || 'com.example.http-light',
    name: process.env.PLUGIN_NAME || 'HTTP Light Example',
    version: '0.1.0',
    endpoints: { health: '/health', command: '/command' }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.post('/command', (req, res) => {
  console.log('Command', req.body);
  // hier Befehl verarbeiten und ggf. Status an HCU melden
  res.json({ result: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Plugin läuft auf Port ${port}`));
