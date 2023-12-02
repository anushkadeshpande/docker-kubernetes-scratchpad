# docker-kubernetes
``` kubectl create deploy k8s-web-hello --image=anushkaa5000/k8s-web-hello ```

## Creating ClusterIP service:
> Can access the service only within the cluster

```kubectl expose deploy k8s-web-hello --port=3000```

```
kubectl get svc
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
k8s-web-hello   ClusterIP   10.111.153.230   <none>        3000/TCP   25s
```
#### Scaling deployment:
```kubectl scale deploy k8s-web-hello --replicas=4```


## Creating NodePort service:
```kubectl expose deploy k8s-web-hello --type=NodePort --port=3000```


## Cresting LoadBalancer service:
```kubectl expose deploy k8s-web-hello --type=LoadBalancer --port=3000```


## Exposing services in minikube:
```minikube service k8s-web-hello```

### Kubernetes dashboard:
``` minikube dashboard ```

![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/337b0f32-ac7a-4b08-a4ec-b1060f9875ba)


##### Deleting all resources:
```kubectl delete all --all```
