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
    return deployments;
  } catch (error) {
    console.error('Error getting ArgoCD deployments:', error);
    throw error;
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
    return services;
  } catch (error) {
    console.error(
      `Error getting services in namespace ${namespace}:`,
      error
    );
    throw error;
  }
}

async function getDeployments(namespace) {
  try {
    const response = await k8sApi.listNamespacedDeployment(namespace);
    const deployments = response.body.items;
    console.log(`Deployments in namespace ${namespace}:`);
    console.log(deployments);
    return deployments;
  } catch (error) {
    console.error(
      `Error getting deployments in namespace ${namespace}:`,
      error
    );
    throw error;
  }
}

app.get('/', async (req, res) => {
  res.send('Hello, World!');

  try {
    // Fetch and log ArgoCD applications
    await getArgoCDApplications();

    // Fetch and log services and deployments in the default namespace
    await getServices('default');
    await getDeployments('default');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
