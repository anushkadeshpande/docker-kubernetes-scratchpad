## Installation:
1. Install istio on local system 
    - Check this page for the latest version https://istio.io/latest/docs/setup/getting-started/#download

2. Add the path to the bin folder to system path, and make sure the following command is executed successfully
    
    ```
    istioctl
    ``` 

3. Install istio in k8s cluster using command
    
    ```
    istioctl install
    ```

    You should be able to see the following output:
   ```
    ✔ Istio core installed
    ✔ Istiod installed
    ✔ Ingress gateways installed
    ✔ Installation complete                                                                                                
    Made this installation the default for injection and validation
   ```

   also, a new namespace will be created:
   
   ![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/365f493c-9fd0-4a62-9f79-b284b69281eb)

   and, the following pods will be running

   ![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/65d80ca1-796f-4113-931b-41137429a06e)

## Architecture:
![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/98edb7d3-fc60-4f3f-bfad-9de95495e79b)

   - control plane  ---> istiod
   - data plane     ---> proxies which are injected in each of the application pods


## Demo:
We'll use the demo application from this repo --> https://github.com/GoogleCloudPlatform/microservices-demo
and deploy the kubernetes-manifests.yaml located under the /release directory

It'll bring up a bunch of pods

```
kubectl get po

NAME                                     READY   STATUS    RESTARTS   AGE
adservice-f99c4f85-kjgkg                 1/1     Running   0          9m10s
cartservice-6fb7cc755b-ps8cj             1/1     Running   0          9m25s
checkoutservice-fc976f5f9-9xvw9          1/1     Running   0          9m39s
currencyservice-67bc4c489f-bbvg7         1/1     Running   0          9m21s
emailservice-5469b79497-4rhsm            1/1     Running   0          9m40s
frontend-7b59d9cdbf-tt7zh                1/1     Running   0          9m34s
loadgenerator-598dc8c4b4-88lgv           1/1     Running   0          9m22s
paymentservice-55dbd46d89-nct2h          1/1     Running   0          9m30s
productcatalogservice-7c4bfd7775-zzpmq   1/1     Running   0          9m26s
recommendationservice-bcb4bb85c-d6ht7    1/1     Running   0          9m37s
redis-cart-79b899577-4wgbp               1/1     Running   0          9m14s
shippingservice-7c4954996f-4mdjv         1/1     Running   0          9m17s
```

but right now, the envoy proxies are not injected into the pods, we need to configure that
The namespace needs to be labeled 

```

kubectl label namespace default istio-injection=enabled
namespace/default labeled
```
```
kubectl get ns default --show-labels

NAME      STATUS   AGE   LABELS
default   Active   31h   istio-injection=enabled,kubernetes.io/metadata.name=default
```

And then restart the pods

This time we can see 2 containers in every pod

```
kubectl get po

NAME                                     READY   STATUS    RESTARTS   AGE
adservice-f99c4f85-26d26                 2/2     Running   0          2m13s
cartservice-6fb7cc755b-2ht4v             2/2     Running   0          2m43s
checkoutservice-fc976f5f9-9qrxb          2/2     Running   0          3m4s
currencyservice-67bc4c489f-9lrpp         2/2     Running   0          2m35s
emailservice-5469b79497-szjkq            2/2     Running   0          3m4s
frontend-7b59d9cdbf-prl89                2/2     Running   0          3m
loadgenerator-598dc8c4b4-5cv52           2/2     Running   0          2m37s
paymentservice-55dbd46d89-hcvbz          2/2     Running   0          2m54s
productcatalogservice-7c4bfd7775-wxmr8   2/2     Running   0          2m48s
recommendationservice-bcb4bb85c-x57t2    2/2     Running   0          3m2s
redis-cart-79b899577-pb85q               2/2     Running   0          2m18s
shippingservice-7c4954996f-kldcb         2/2     Running   0          2m24s
```

This init container is injected in each of the pods

![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/97299343-bad1-4491-bbcd-aedaacda65dc)

### Visualization using kiali:

We need to apply ```kiali.yaml``` and ```prometheus.yaml``` in order to see the visualization on Kiali

Once kiali and prometheus pods are up in the ```istio-system``` namespace, we need to access the kiali dashboard.

```
kubectl port-forward svc/kiali -n istio-system 20001
```

And then the kiali dashboard can be accessed at ```127.0.0.1:20001```

Kiali dashboard:

![image](https://github.com/anushkadeshpande/docker-kubernetes/assets/53345232/546246a6-cc7d-4c57-ab48-a9476c60f4d0)

