# Fullstack Application - Kubernetes Deployment

> **Stack:** React → Nginx → Node.js → PostgreSQL

## 📂 Structure

```
manifests/
├── backend/          # Node.js Express API
│   ├── configmap.yaml      # Environment variables (DB_HOST, DB_PORT, etc.)
│   ├── secret.yaml         # Credentials (DB_USER, DB_PASSWORD)
│   ├── sealed-secret.yaml  # Encrypted secret for Git
│   ├── deployment.yaml     # 2 replicas, health probes, init containers
│   └── service.yaml        # ClusterIP (internal only)
│
├── frontend/         # React + Nginx
│   ├── deployment.yaml     # 2 replicas, serves static files
│   └── service.yaml        # LoadBalancer (external access)
│
├── database/         # PostgreSQL
│   ├── configmap.yaml      # Database configuration (DB name, user, etc.)
│   ├── secret.yaml         # Database password
│   ├── sealed-secret.yaml  # Encrypted secret for Git
│   ├── deployment.yaml     # StatefulSet with volumeClaimTemplate
│   └── service.yaml        # ClusterIP (internal only)
│
└── exercises/        # Learning resources
    ├── broken-app.yaml     # Practice debugging CrashLoopBackOff
    └── memory-test.yaml    # Practice OOMKilled scenarios
```

## 🚀 Deployment Order

**Important:** Deploy in this order due to dependencies:

```bash
# 1. Database layer (backend depends on this)
kubectl apply -f manifests/database/

# 2. Backend layer (frontend depends on this)
kubectl apply -f manifests/backend/

# 3. Frontend layer
kubectl apply -f manifests/frontend/
```

**Or deploy everything at once:**
```bash
kubectl apply -f manifests/
```

## 🔧 Prerequisites

✅ **SECURITY NOTICE:**  
This project uses **Sealed Secrets** for secure secret management. Secrets are encrypted and safe to commit to Git. The plaintext secrets are gitignored and only exist locally.

### **Required Add-Ons:**

This application requires the following Kubernetes controllers to be installed in your cluster:

1. **Sealed Secrets Controller (v0.24.5+)**
   ```bash
   # Install the controller in your cluster:
   kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.5/controller.yaml
   
   # Verify it's running:
   kubectl get pods -n kube-system | grep sealed-secrets
   ```
   
   **Why needed:** This application uses `SealedSecret` resources that require the controller to decrypt them into regular `Secret` resources.
   
   📖 See [SEALED-SECRETS-HOWTO.md](../../../SEALED-SECRETS-HOWTO.md) for full documentation.

### **Deployment Steps:**

1. **Minikube running:**
   ```bash
   minikube start
   ```

2. **Install Sealed Secrets Controller** (see above)

3. **Images built in Minikube's Docker:**
   ```bash
   eval $(minikube docker-env)
   cd /path/to/src/fullstack-app
   docker-compose build
   ```

3. **Image names match:**
   - `fullstack-app-backend:latest`
   - `fullstack-app-frontend:latest`
   - `postgres:15-alpine`

## 🧪 Verify Deployment

```bash
# Check all pods are running
kubectl get pods

# Check services
kubectl get services

# Get frontend URL
minikube service frontend-service --url

# Check logs
kubectl logs -l app=backend
kubectl logs -l app=frontend
```

## 📚 What Each Resource Does

| File | Resource Type | Purpose |
|------|---------------|---------|
| **ConfigMap** | Configuration | Non-sensitive environment variables |
| **Secret** | Configuration | Sensitive data (base64 encoded) |
| **Deployment** | Workload | Manages pods, handles rolling updates |
| **Service** | Networking | DNS name + load balancing for pods |
| **PVC** | Storage | Request for persistent disk space |

