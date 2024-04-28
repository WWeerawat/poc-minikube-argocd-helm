argo-cd-setup:
	# Create a namespace for ArgoCD
	kubectl create namespace argocd
	# Install ArgoCD using Helm
	helm repo add argo https://argoproj.github.io/argo-helm
	helm install argocd argo/argo-cd --namespace argocd

argo-cd-ui:
	kubectl port-forward service/argocd-server -n argocd 8080:443

argo-cd-get-secret:
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d


IMAGE_NAME=k8s-cluster-info-node-app
APP_VERSION=1.0.3
docker-build-and-push:
	docker build -f ./src/dockerfile -t ${IMAGE_NAME} ./src
	docker tag ${IMAGE_NAME}:latest 4weerawat/${IMAGE_NAME}:${APP_VERSION}
	docker push 4weerawat/${IMAGE_NAME}:${APP_VERSION}

apply-app1:
	kubectl apply -f ./argo-app/app1.yaml
