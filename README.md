# Kubernetes:

## Index:
- [Components](#components)
  - [kube-apiserver](#kube-apiserver)
  - [kubectl](#kubectl)
  - [etcd](#etcd)
  - [kube-scheduler](#kube-scheduler)
  - [controller-manager](#controller-manager)
  - [kubelet](#kubelet)
  - [Container Runtime Interface (CRI)](##container-runtime-interface-cri)
  - [kube-proxy](#kube-proxy)
- [Kubernetes Commands](#kubernetes-commands) 
- [Docker Commands](#docker-commands)

## Components:

#### kube-apiserver:
- Provides access to the Kubernetes API.
- Acts as the frontend for the Kubernetes control plane.
- Authenticates and validates requests from kubectl and other components.

#### kubectl:
- Command-line tool used to interact with the Kubernetes cluster.
- Communicates with kube-apiserver to retrieve necessary data or execute commands.
- Uses curl under the hood to sent requests to Kubernetes API
- The context used by kubectl is stored in `~/.kube/config`

#### etcd:
- A distributed key-value store used to store all cluster data.
- Holds the configuration data, state, and metadata for Kubernetes resources.
- Ensures consistency and availability of the data across the cluster.

#### kube-scheduler:
- Responsible for scheduling pods on available nodes.
- Evaluates the resource requirements of each pod and matches them with the available resources in the cluster.

#### controller-manager:
- Makes sure the cluster is in the desired state.
- Responsible to bring up any pod that goes down
- Runs different controller processes ex node-controller (manages a node)

#### kubelet:
- An agent that runs on each node in the cluster.
- Ensures that containers are running in a pod.
- Monitors the state of the pods and reports back to the control plane.
- Interacts with the Container Runtime Interface (CRI) to manage container lifecycle.
- Requests the container runtime to fetch and manage container images.

#### Container Runtime Interface (CRI):
- Examples of container runtimes include Docker, containerd, and CRI-O.
- Responsible for pulling images, starting, and stopping containers, and managing container storage and networking.

#### kube-proxy:
- Manages network rules
- Allows communication with the pod inside and outside of a kubernetes cluster


<hr>

## Kubernetes Commands:

#### To get kubeconfig
```
kubectl config view
```

#### To get pods
```
kubectl get po -n <namespace>
```
To get all pods from all namespaces:
```
kubectl get po -A
```

#### To change context of kubectl
```
kubectl config set-context --current -namespace={ns}
```

#### To get info about any k8s component
```
kubectl explain <component-name>
```

<hr>

## Docker Commands:

#### To save an image to a tar file:
```
docker save <image-name>
```

#### To rename a container
```
docker container rename <container-id> <new-name>
```


#### To copy files from a docker container:
```
docker cp <containerId>:/file/path/within/container /host/path/target
```
