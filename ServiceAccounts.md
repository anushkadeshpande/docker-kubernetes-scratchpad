# Service Accounts

To access a kubernetes api server, an authentication token is required. The services running inside the containers use a service account to authenticate with the kubernetes api server.

A service account represents and provides an identity to the pods. Each pod created has a service account associated with it.

If a service account is not specified, Kubernetes will set the `default` service account by default which is present in every namespace.

`Default` service account is bound to the namespace it lives in.

To get the service accounts in a namespace:
```
kubectl get serviceaccount -n <ns>
```


To describe a service account
```
kubectl describe sa default -n test
```
```
Name:                default
Namespace:           test
Labels:              <none>
Annotations:         <none>
Image pull secrets:  <none>
Mountable secrets:   <none>
Tokens:              <none>
Events:              <none>
```

`Image pull secrets` are used by all pods to pull the images <br>
`Mountable secrets` specifies the secrets that can be mounted by the pods using this service account. <br>
`Tokens` lists all auth tokens in service account. Kubernetes also automatically mounts the 1st token inside the container.


Kubernetes uses different authentication mechanisms to authenticate API requests:
- Client certificates
- Bearer tokens
- Authenticating proxies
- HTTP basic auth
  
