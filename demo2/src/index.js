const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Read package.json to get version
const { version } = require('./package.json');

app.get('/health', (req, res) => {
  res.send('OK');
  res.status(200);
});

app.get('/', (req, res) => {
  // Get pod name from environment variable (if running in Kubernetes)
  const podName = process.env.HOSTNAME || 'localhost';

  res.send(
    `Hello, World! \nPod Name: ${podName}\nVersion: ${version}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
