import Docker from 'dockerode';
// import path from 'path';
const docker = new Docker();

export const handleContainerCreate = async (projectId, wsShell, req, socket, head) => {
    console.log("Project id received for container create", projectId);
    try {
        const container = await docker.createContainer({
            Image: 'sandbox', // name given by us for the written dockerfile
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            Volumes: {
                "/home/sandbox/app": {}
            },
            ExposedPorts: {
                "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [ // mounting the project directory to the container
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {"5173/tcp": [{ HostPort: "0" }],},
            },
            
        });
    
        console.log("Container created", container.id);

        await container.start();

        console.log("container started");

        setInterval(() => {
            docker.listContainers({ name: projectId }, (err, container) => {
                if (err) console.log(err);
                else {
                  console.log(container, projectId);
                  const port = container[0].Ports;
                  console.log(port);
                //   const successMessage = {
                //     type: "registerPort",
                //     payload: {
                //       port: port,
                //     },
                //   };
                //   ws.send(JSON.stringify(successMessage));
                }
              });
        }, 10000)

        wsShell.handleUpgrade(req, socket, head, (ws) => {
            wsShell.emit("connection", ws, req, container);
        });

    } catch(error) {
        console.log("Error while creating container", error);
    }


}
