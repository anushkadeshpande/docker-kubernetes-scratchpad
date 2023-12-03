1. Enable ingress in minikube

``` minikube addons enable ingress ```

Then, 

```
kubectl apply -f dashboard-ingress.yaml
```