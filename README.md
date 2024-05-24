# Kubernetes:

## Components:

#### kube-apiserver:
- Provides access to the Kubernetes API.
- Acts as the frontend for the Kubernetes control plane.
- Authenticates and validates requests from kubectl and other components.

#### kubectl:
- Command-line tool used to interact with the Kubernetes cluster.
- Communicates with kube-apiserver to retrieve necessary data or execute commands.

#### etcd:
- A distributed key-value store used to store all cluster data.
- Holds the configuration data, state, and metadata for Kubernetes resources.
- Ensures consistency and availability of the data across the cluster.

#### kube-scheduler:
- Responsible for scheduling pods on available nodes.
- Evaluates the resource requirements of each pod and matches them with the available resources in the cluster.

#### kubelet:
- An agent that runs on each node in the cluster.
- Ensures that containers are running in a pod.
- Monitors the state of the pods and reports back to the control plane.
- Interacts with the Container Runtime Interface (CRI) to manage container lifecycle.
- Requests the container runtime to fetch and manage container images.

#### Container Runtime Interface (CRI):
- Examples of container runtimes include Docker, containerd, and CRI-O.
- Responsible for pulling images, starting, and stopping containers, and managing container storage and networking.
