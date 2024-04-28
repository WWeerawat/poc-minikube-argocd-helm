const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importing required Kubernetes client libraries
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

// Read package.json to get version
const { version } = require('./package.json');

// Function to get service associated with the pod
async function getPodService(podName, namespace) {
  try {
    const response = await k8sApi.listNamespacedService(namespace);
    const services = response.body.items;

    for (const service of services) {
      const selector = service.spec.selector;
      const podSelector = Object.keys(selector)
        .map((key) => `${key}=${selector[key]}`)
        .join(',');

      // Check if pod name matches the service's selector
      if (podSelector === podName) {
        return service.metadata.name;
      }
    }

    return 'No associated service found';
  } catch (error) {
    console.error('Error getting pod service:', error);
    throw error;
  }
}

// Function to get deployment associated with the pod
async function getPodDeployment(podName, namespace) {
  try {
    const response = await appsV1Api.listNamespacedDeployment(
      namespace
    );
    const deployments = response.body.items;

    for (const deployment of deployments) {
      const deploymentSelector = deployment.spec.selector.matchLabels;
      const podSelector = Object.keys(deploymentSelector)
        .map((key) => `${key}=${deploymentSelector[key]}`)
        .join(',');

      // Check if pod name matches the deployment's selector
      if (podSelector === podName) {
        return deployment.metadata.name;
      }
    }

    return 'No associated deployment found';
  } catch (error) {
    console.error('Error getting pod deployment:', error);
    throw error;
  }
}

// Function to get ArgoCD application associated with the deployment
async function getDeploymentArgoCDApp(deploymentName) {
  try {
    // In this example, we assume that the ArgoCD application name matches the deployment name
    return deploymentName;
  } catch (error) {
    console.error(
      'Error getting deployment ArgoCD application:',
      error
    );
    throw error;
  }
}

app.get('/health', (req, res) => {
  res.send('OK');
  res.status(200);
});

app.get('/', async (req, res) => {
  // Get pod name from environment variable (if running in Kubernetes)
  const podName = process.env.HOSTNAME || 'localhost';

  // Fetch associated service, deployment, and ArgoCD application
  const namespace = 'default'; // Adjust the namespace as needed
  const service = await getPodService(podName, namespace);
  const deployment = await getPodDeployment(podName, namespace);
  const argoCDApp = await getDeploymentArgoCDApp(deployment);

  res.send(
    `Hello, World! \nPod Name: ${podName}\nVersion: ${version}\nService: ${service}\nDeployment: ${deployment}\nArgoCD Application: ${argoCDApp}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
