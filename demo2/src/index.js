const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Read package.json to get version
const { version } = require('./package.json');

app.get('/', (req, res) => {
  // Get pod name from environment variable (if running in Kubernetes)
  const podName = process.env.HOSTNAME || 'localhost';

  // Log pod name and version
  console.log(`Pod Name: ${podName}`);
  console.log(`Version: ${version}`);

  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
