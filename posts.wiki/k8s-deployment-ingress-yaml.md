#### Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-service-deployment
  labels:
    app: my-service
spec:
  selector:
    matchLabels:
      app: my-service
  replicas: 3
  template:
    metadata:
      labels:
        app: my-service
    spec:
      containers:
        - name: my-service
          image: <Repo Url in Dockerhub>
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
```

#### Ingress
```yaml

---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-service-ingress
spec:
  rules:
    - host: <Domain Address>
      http:
        paths:
          - path: /
            backend:
              serviceName: my-service-load-balancer
              servicePort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: my-service
  name: my-service-load-balancer
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
  selector:
    app: my-service
  type: ClusterIP
```