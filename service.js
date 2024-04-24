const express = require('express');
const app = express();
const port = 3000;

// Retrieve the pod name from the environment variable HOSTNAME
const podName = process.env.HOSTNAME || 'Unknown Pod';

app.listen(port);
console.log(`App running at http://localhost:${port}`);

app.get('/health', (req, res) => {
  res.send('OK');
  res.status(200);
});

app.get('/', (req, res) => {
  const appVersion = process.env.APP_VERSION || 'unknown';
  res.send(
    `Hello from version ${appVersion} This is pod ${podName}.`
  );
});
