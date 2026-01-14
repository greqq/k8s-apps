# Kubernetes Learning Project

A fullstack application deployed on Kubernetes, built for learning DevOps concepts including Docker, Kubernetes, Helm, and CI/CD pipelines.

## Project Structure

```
.
├── src/fullstack-app/          # Application source code
│   ├── backend/                # Node.js Express API
│   ├── frontend/               # React application with Nginx
│   └── database/               # PostgreSQL configuration
├── k8s/fullstack-app/          # Kubernetes resources
│   ├── helm-chart/             # Helm chart for deployment
│   └── manifests/              # Raw Kubernetes manifests
└── .github/workflows/          # CI/CD pipeline
```

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Nginx
- **Database**: PostgreSQL
- **Container**: Docker
- **Orchestration**: Kubernetes
- **Package Manager**: Helm
- **CI/CD**: GitHub Actions
- **Registry**: GitHub Container Registry (ghcr.io)

## Quick Start

### Prerequisites

- Docker
- Minikube
- kubectl
- Helm 3

### Local Development with Minikube

```bash
# Start Minikube
minikube start

# Create registry secret (for pulling images from GHCR)
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN

# Deploy with Helm
helm install fullstack-dev ./k8s/fullstack-app/helm-chart

# Access the application
minikube service fullstack-dev-frontend --url
```

### Useful Commands

```bash
# Check pod status
kubectl get pods

# View logs
kubectl logs -l app=fullstack-dev-backend

# Upgrade deployment
helm upgrade fullstack-dev ./k8s/fullstack-app/helm-chart

# Rollback
helm rollback fullstack-dev

# Uninstall
helm uninstall fullstack-dev
```

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push to `main` or `develop`:

1. **Lint and Test** - Runs linting and tests on backend
2. **Build and Push** - Builds Docker images and pushes to GHCR
3. **Security Scan** - Scans images for vulnerabilities with Trivy
4. **Update Manifests** - Updates Kubernetes manifests with new image tags

## Helm Chart

The Helm chart supports multiple environments through values files:

```bash
# Development (default)
helm install fullstack-dev ./k8s/fullstack-app/helm-chart

# Override values
helm install fullstack-dev ./k8s/fullstack-app/helm-chart \
  --set backend.replicas=3 \
  --set frontend.replicas=3
```

### Key Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `backend.replicas` | Backend pod replicas | 2 |
| `frontend.replicas` | Frontend pod replicas | 2 |
| `database.persistence.size` | Database storage size | 1Gi |
| `frontend.service.type` | Frontend service type | LoadBalancer |


## Features

- Dynamic service discovery using envsubst pattern in Nginx
- Health checks with readiness and liveness probes
- Init containers for database dependency management
- Persistent storage for PostgreSQL with StatefulSet
- Multi-platform Docker images (amd64, arm64)
- Automated security scanning with Trivy

## Development

### Building Images Locally

```bash
# Build backend
docker build -t ghcr.io/YOUR_USERNAME/k8s-apps/backend:latest ./src/fullstack-app/backend

# Build frontend
docker build -t ghcr.io/YOUR_USERNAME/k8s-apps/frontend:latest ./src/fullstack-app/frontend
```

### Running with Docker Compose

```bash
cd docker/docker-fullstack-app
docker-compose up
```

