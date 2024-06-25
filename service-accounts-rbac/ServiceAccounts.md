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


The mountable secret from the account gets automatically mounted in each pod under `/var/run/secrets/kubernetes.io/serviceaccount`. <br>
The secret then stores the authentication token mounted as `token` file.<br>
The namespace is mounted as `namespace` file. <br>
The Public security authority of the api server is mounted as `ca.crt` file.

![image](https://github.com/anushkadeshpande/docker-kubernetes-scratchpad/assets/53345232/0cb2bbb8-ac99-4862-8fd3-e91e2c1d55bb)


Kubernetes uses different authentication mechanisms to authenticate API requests:
- Client certificates
- Bearer tokens
- Authenticating proxies
- HTTP basic auth


When API Server receives a requests, it goes through the authentication mechanism and try to extract callers identity through the request. <br>
The callers identity has multiple parts -- username, userid, group, etc.<br>
The API Server uses this username to determine if the caller (the process inside the container) could perform the desired action.

Each service account can belong to one or more groups and these groups are used to grant permission to multiple users at the same time.


### Trying to hit kubernetes service:

```
> TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
```
```
> curl -sSk -H "Authorization: Bearer $TOKEN" https://kubernetes.default:443/api

> {
  "kind": "APIVersions",
  "versions": [
    "v1"
  ],
  "serverAddressByClientCIDRs": [
    {
      "clientCIDR": "0.0.0.0/0",
      "serverAddress": "192.168.49.2:8443"
    }
  ]
}
```
```
> curl -sSk -H "Authorization: Bearer $TOKEN" https://kubernetes.default:443/api/v1/namespaces

> {
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "namespaces is forbidden: User \"system:serviceaccount:test:default\" cannot list resource \"namespaces\" in API group \"\" at the cluster scope",
  "reason": "Forbidden",
  "details": {
    "kind": "namespaces"
  },
  "code": 403
}
```


Access to Kubernetes resources is configured via:
- role
- clusterrole
- rolebinding
- clusterrolebinding

#### Role
It contains rules that represent a set of permissions <br>
It is defined on namespace level and the rules apply only on that namespace <br>


#### Clusterrole
Applies permissions on a cluster level
