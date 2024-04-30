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


argo-rollout-setup:
	kubectl create namespace argo-rollouts
	kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml


IMAGE_NAME=k8s-cluster-info-node-app
APP_VERSION=1.0.8
docker-build-and-push:
	docker build -f ./src/dockerfile -t ${IMAGE_NAME} ./src
	docker tag ${IMAGE_NAME}:latest 4weerawat/${IMAGE_NAME}:${APP_VERSION}
	docker push 4weerawat/${IMAGE_NAME}:${APP_VERSION}

apply-app0:
	kubectl apply -f ./argo-app/helm-app-0.yaml

apply-app2:
	kubectl apply -f ./argo-app/app2.yaml

apply-app-grp:
	kubectl apply -f ./argo-app/application-group.yaml
