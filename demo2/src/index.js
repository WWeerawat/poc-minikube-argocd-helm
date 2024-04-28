// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

async function getArgoCDApplications() {
  try {
    const response = await k8sApi.listNamespacedDeployment('argocd');
    const deployments = response.body.items;
    console.log('ArgoCD Deployments:');
    console.log(deployments);
  } catch (error) {
    console.error('Error getting ArgoCD deployments:', error);
  }
}

async function getServices(namespace) {
  try {
    const response = await k8sCoreApi.listNamespacedService(
      namespace
    );
    const services = response.body.items;
    console.log(`Services in namespace ${namespace}:`);
    console.log(services);
  } catch (error) {
    console.error(
      `Error getting services in namespace ${namespace}:`,
      error
    );
  }
}

async function getDeployments(namespace) {
  try {
    const response = await k8sApi.listNamespacedDeployment(namespace);
    const deployments = response.body.items;
    console.log(`Deployments in namespace ${namespace}:`);
    console.log(deployments);
  } catch (error) {
    console.error(
      `Error getting deployments in namespace ${namespace}:`,
      error
    );
  }
}

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Fetch and log ArgoCD applications
  getArgoCDApplications();

  // Fetch and log services and deployments in the default namespace
  getServices('default');
  getDeployments('default');
});
