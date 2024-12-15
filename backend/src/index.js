import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import apiRouter from './routes/index.js';
import { PORT } from './config/serverConfig.js';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainerCreate } from './containers/handleContainerCreate.js';
import { handleShellCreation } from './containers/handleShellCreation.js';
import { WebSocketServer } from "ws";
import querystring from "querystring";


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    }
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});

const editorNamespace = io.of('/editor');

editorNamespace.on("connection", (socket) => {
    console.log("editor connected");

    // somehow we will get the projectId from frontend;
    let projectId = socket.handshake.query['projectId'];

    console.log("Project id received after connection", projectId);

    if(projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true, /** keeps the watcher in running state till the time app is running */
            awaitWriteFinish: {
                stabilityThreshold: 2000 /** Ensures stability of files before triggering event */
            },
            ignoreInitial: true /** Ignores the initial files in the directory */
        });

        watcher.on("all", (event, path) => {
            console.log(event, path);
        });
    }

    handleEditorSocketEvents(socket, editorNamespace);

    // socket.on("disconnect", async () => {
    //     await watcher.close();
    //     console.log("editor disconnected");

    // });

});

// const terminalNamespace = io.of('/terminal');
// terminalNamespace.on("connection", (socket) => {
//     console.log("terminal connected");

//     let projectId = socket.handshake.query['projectId'];

//     // socket.on("shell-input", (data) => {
//     //     console.log("input recevied", data);
//     //     terminalNamespace.emit("shell-output", data);
//     // });

//     socket.on("disconnect", () => {
//         console.log("terminal disconnected");
//     });
//     handleContainerCreate(projectId, socket);
// });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.cwd())
});


const wsForShell = new WebSocketServer({
    noServer: true,
  });


  server.on("upgrade", (req, socket, head) => {
    const isShell = req.url.includes("/terminal");
  
    if (!isShell) {
    //   wsForMonaco.handleUpgrade(req, socket, head, (ws) => {
    //     wsForMonaco.emit("connection", ws, req);
    //   });
    } else {
        console.log(req.url)
      const { projectId } = querystring.parse(req.url.split("?")[1]);
      handleContainerCreate(projectId, wsForShell, req, socket, head);
    }
  });

  wsForShell.on("connection", (ws, req, container) => {
    handleShellCreation(container, ws);
    ws.on("close", () => {
      container.remove({ force: true }, (err, data) => {
        if (err) console.log(err);
        else console.log(`Killed container ${container.id} with no error`);
      });
    });
  });