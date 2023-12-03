Enable ingress in minikube

``` 
minikube addons enable ingress
```

Then, 

```
kubectl apply -f dashboard-ingress.yaml
```

After that, an ingress resource will be created

```
kubectl get ingress -n kubernetes-dashboard
```
```
NAME                CLASS   HOSTS           ADDRESS        PORTS   AGE
dashboard-ingress   nginx   dashboard.com   192.168.49.2   80      47s
```

Now, an entry needs to be added in /etc/hosts file for mapping the domain to IP
``` 127.0.0.1 dashboard.com ```

Note: 127.0.0.1 needs to be mapped to the domain name and minikube tunnel needs to be enabled using the following command

``` minikube tunnel ```


After following the above steps, kubernetes dashboard can be accessed via dashboard.com
![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/8c90dfb0-4fbb-4d56-a1ee-9495db7e4a37)
