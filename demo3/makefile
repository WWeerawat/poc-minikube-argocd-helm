argo-cd-setup:
	# Create a namespace for ArgoCD
	kubectl create namespace argocd
	# Install ArgoCD using Helm
	helm repo add argo https://argoproj.github.io/argo-helm
	# helm install argocd argo/argo-cd --namespace argocd

argo-cd-ui:
	kubectl port-forward service/argocd-server -n argocd 8080:443

argo-cd-get-secret:
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d


apply-all:
	minikube addons enable metrics-server && minikube addons enable ingress

install-prom:
	helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
	helm repo update
	helm install prometheus prometheus-community/prometheus


IMAGE_NAME=nest-graphql-health
APP_VERSION=0.0.3

# IMAGE_NAME=nest-new-gql
# APP_VERSION=0.0.1
docker-build-and-push:
	docker build -f ./${IMAGE_NAME}/Dockerfile -t ${IMAGE_NAME} ./${IMAGE_NAME}
	docker tag ${IMAGE_NAME}:latest 4weerawat/${IMAGE_NAME}:${APP_VERSION}
	docker push 4weerawat/${IMAGE_NAME}:${APP_VERSION}

apply-app1:
	kubectl apply -f ./argo-app/app1.yaml

apply-app2:
	kubectl apply -f ./argo-app/app2.yaml

apply-app-grp:
	kubectl apply -f ./argo-app/application-group.yaml
