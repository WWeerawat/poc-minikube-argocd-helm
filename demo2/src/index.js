const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Read package.json to get version
const { version } = require('./package.json');

let isHealthy = true; // Variable to simulate health status

app.get('/healthz', (req, res) => {
  console.log(`/healthz isHealthy ${isHealthy}`);
  if (isHealthy) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('Unhealthy');
  }
});

app.get('/readyz', (req, res) => {
  console.log(`/readyz isHealthy ${isHealthy}`);
  if (isHealthy) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('Unready');
  }
});

app.get('/', (req, res) => {
  // Get pod name from environment variable (if running in Kubernetes)
  const podName = process.env.HOSTNAME || 'localhost';

  res.send(
    `Hello, World! \nPod Name: ${podName}\nVersion: ${version}`
  );
});

// Endpoint to simulate health status change
app.get('/toggle-health', (req, res) => {
  isHealthy = !isHealthy;
  res.send(
    `Health status toggled to ${isHealthy ? 'healthy' : 'unhealthy'}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
