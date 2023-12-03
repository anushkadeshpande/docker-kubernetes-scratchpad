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
