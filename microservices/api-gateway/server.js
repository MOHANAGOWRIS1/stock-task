// // // // // // // // const express = require("express");
// // // // // // // // const http = require("http");
// // // // // // // // const axios = require("axios");
// // // // // // // // const WebSocket = require("ws");
// // // // // // // // const cors = require("cors");

// // // // // // // // const app = express();
// // // // // // // // app.use(cors());
// // // // // // // // app.use(express.json());

// // // // // // // // // REST API Proxy
// // // // // // // // app.get("/gateway/price", async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // // // // // //     res.json(response.data);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // app.get("/gateway/fund", async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const response = await axios.get("http://localhost:4008/fund");
// // // // // // // //     res.json(response.data);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // WebSocket Proxy
// // // // // // // // const server = http.createServer(app);
// // // // // // // // const wss = new WebSocket.Server({ server });

// // // // // // // // wss.on("connection", (ws) => {
// // // // // // // //   console.log("Client connected to API Gateway WebSocket");

// // // // // // // //   // Connect to Stock Price Backend WS
// // // // // // // //   const priceWS = new WebSocket("ws://localhost:4300");
// // // // // // // //   priceWS.on("message", (msg) => {
// // // // // // // //     ws.send(JSON.stringify({ type: "price", data: JSON.parse(msg) }));
// // // // // // // //   });

// // // // // // // //   // Connect to Stock Percentage Backend WS
// // // // // // // //   const fundWS = new WebSocket("ws://localhost:4008");
// // // // // // // //   fundWS.on("message", (msg) => {
// // // // // // // //     ws.send(JSON.stringify({ type: "fund", data: JSON.parse(msg) }));
// // // // // // // //   });

// // // // // // // //   ws.on("close", () => {
// // // // // // // //     console.log("Client disconnected from API Gateway WS");
// // // // // // // //     priceWS.close();
// // // // // // // //     fundWS.close();
// // // // // // // //   });
// // // // // // // // });

// // // // // // // // const PORT = 5000;
// // // // // // // // server.listen(PORT, () => {
// // // // // // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // // // // // // });

// // // // // // // const express = require("express");
// // // // // // // const http = require("http");
// // // // // // // const axios = require("axios");
// // // // // // // const WebSocket = require("ws");
// // // // // // // const cors = require("cors");

// // // // // // // const app = express();
// // // // // // // app.use(cors());
// // // // // // // app.use(express.json());

// // // // // // // // ----------------- REST API Proxy -----------------
// // // // // // // app.get("/gateway/price", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // // // // //     res.json(response.data);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // app.get("/gateway/fund", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const response = await axios.get("http://localhost:4008/fund");
// // // // // // //     res.json(response.data);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ----------------- WebSocket Proxy -----------------
// // // // // // // const server = http.createServer(app);

// // // // // // // // Helper function to filter by type
// // // // // // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // // // // // //   const backendWS = new WebSocket(sourceUrl);

// // // // // // //   backendWS.on("message", (msg) => {
// // // // // // //     try {
// // // // // // //       const data = JSON.parse(msg);
// // // // // // //       if (data.type === expectedType) {
// // // // // // //         // send only the inner data if you want cleaner payload
// // // // // // //         clientWS.send(JSON.stringify(data.data));
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Invalid WS message:", msg);
// // // // // // //     }
// // // // // // //   });

// // // // // // //   backendWS.on("error", (err) => console.error("Backend WS error:", err));
// // // // // // //   backendWS.on("close", () => console.log(`Disconnected from ${sourceUrl}`));

// // // // // // //   clientWS.on("close", () => backendWS.close());
// // // // // // // }

// // // // // // // // Price WebSocket Proxy (only "price")
// // // // // // // const priceWSS = new WebSocket.Server({ server, path: "/price" });
// // // // // // // priceWSS.on("connection", (ws) => {
// // // // // // //   console.log("Client connected to /price");
// // // // // // //   proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // // // // });

// // // // // // // // Fund WebSocket Proxy (only "fund")
// // // // // // // const fundWSS = new WebSocket.Server({ server, path: "/fund" });
// // // // // // // fundWSS.on("connection", (ws) => {
// // // // // // //   console.log("Client connected to /fund");
// // // // // // //   proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // // // // // // });

// // // // // // // const PORT = 5000;
// // // // // // // server.listen(PORT, () => {
// // // // // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // // // // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // // // // // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund`);
// // // // // // // });

// // // // // // // const express = require("express");
// // // // // // // const http = require("http");
// // // // // // // const axios = require("axios");
// // // // // // // const WebSocket = require("ws");
// // // // // // // const cors = require("cors");

// // // // // // // const app = express();
// // // // // // // app.use(cors());
// // // // // // // app.use(express.json());

// // // // // // // // ----------------- REST API Proxy -----------------
// // // // // // // app.get("/gateway/price", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // // // // //     res.json(response.data);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // app.get("/gateway/fund", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const response = await axios.get("http://localhost:4008/fund");
// // // // // // //     res.json(response.data);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // ----------------- WebSocket Proxy Helper -----------------
// // // // // // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // // // // // //   let backendWS = new WebSocket(sourceUrl);

// // // // // // //   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

// // // // // // //   backendWS.on("message", (msg) => {
// // // // // // //     try {
// // // // // // //       const data = JSON.parse(msg);
// // // // // // //       if (data.type === expectedType) {
// // // // // // //         clientWS.send(JSON.stringify(data.data));
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Invalid WS message:", msg);
// // // // // // //     }
// // // // // // //   });

// // // // // // //   backendWS.on("error", (err) => {
// // // // // // //     console.error(`Backend WS error (${sourceUrl}):`, err.message);
// // // // // // //     setTimeout(() => {
// // // // // // //       if (clientWS.readyState === WebSocket.OPEN) {
// // // // // // //         console.log(`Retrying backend WS connection: ${sourceUrl}`);
// // // // // // //         proxyWithFilter(clientWS, sourceUrl, expectedType);
// // // // // // //       }
// // // // // // //     }, 2000);
// // // // // // //   });

// // // // // // //   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

// // // // // // //   clientWS.on("close", () => {
// // // // // // //     if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
// // // // // // //       backendWS.close();
// // // // // // //     }
// // // // // // //   });
// // // // // // // }

// // // // // // // // ----------------- Single WebSocket Server -----------------
// // // // // // // const server = http.createServer(app);
// // // // // // // const wss = new WebSocket.Server({ server });

// // // // // // // wss.on("connection", (ws, req) => {
// // // // // // //   const path = req.url;
// // // // // // //   console.log("Client connected to path:", path);

// // // // // // //   if (path === "/price") {
// // // // // // //     // Proxy price messages
// // // // // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // // // //   } else if (path === "/fund") {
// // // // // // //     // Proxy fund messages
// // // // // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // // // // // //   } else {
// // // // // // //     // Root WS: forward both price and fund messages
// // // // // // //     // ws.send(JSON.stringify({ message: "Connected to root WS! Receiving both price & fund updates." }));

// // // // // // //     // Proxy both backends
// // // // // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");

// // // // // // //     ws.on("message", (msg) => {
// // // // // // //       console.log("Received from client:", msg.toString());
// // // // // // //       // optional: echo back
// // // // // // //       ws.send(`Echo: ${msg}`);
// // // // // // //     });

// // // // // // //     ws.on("close", () => console.log("Client disconnected from root WS"));
// // // // // // //   }
// // // // // // // });



// // // // // // // // ----------------- Start Server -----------------
// // // // // // // const PORT = 5000;
// // // // // // // server.listen(PORT, () => {
// // // // // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // // // // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // // // // // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`);
// // // // // // // });



// // // // // // const express = require("express");
// // // // // // const http = require("http");
// // // // // // const axios = require("axios");
// // // // // // const WebSocket = require("ws");
// // // // // // const cors = require("cors");

// // // // // // const app = express();
// // // // // // app.use(cors());
// // // // // // app.use(express.json());

// // // // // // // ----------------- REST API Proxy -----------------
// // // // // // app.get("/gateway/price", async (req, res) => {
// // // // // //   try {
// // // // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // // // //     res.json(response.data);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // app.get("/gateway/fund", async (req, res) => {
// // // // // //   try {
// // // // // //     const response = await axios.get("http://localhost:4008/fund");
// // // // // //     res.json(response.data);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // ----------------- WebSocket Proxy Helper -----------------
// // // // // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // // // // //   let backendWS = new WebSocket(sourceUrl);

// // // // // //   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

// // // // // //   backendWS.on("message", (msg) => {
// // // // // //     try {
// // // // // //       const data = JSON.parse(msg);
// // // // // //       if (data.type === expectedType) {
// // // // // //         // Send both type and data so client knows which is which
// // // // // //         clientWS.send(JSON.stringify({ type: expectedType, data: data.data }));
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("Invalid WS message:", msg);
// // // // // //     }
// // // // // //   });

// // // // // //   backendWS.on("error", (err) => {
// // // // // //     console.error(`Backend WS error (${sourceUrl}):`, err.message);
// // // // // //     setTimeout(() => {
// // // // // //       if (clientWS.readyState === WebSocket.OPEN) {
// // // // // //         // console.log(`Retrying backend WS connection: ${sourceUrl}`);
// // // // // //         proxyWithFilter(clientWS, sourceUrl, expectedType);
// // // // // //       }
// // // // // //     }, 2000);
// // // // // //   });

// // // // // //   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

// // // // // //   clientWS.on("close", () => {
// // // // // //     if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
// // // // // //       backendWS.close();
// // // // // //     }
// // // // // //   });
// // // // // // }

// // // // // // // ----------------- Single WebSocket Server -----------------
// // // // // // const server = http.createServer(app);
// // // // // // const wss = new WebSocket.Server({ server });

// // // // // // wss.on("connection", (ws, req) => {
// // // // // //   const path = req.url;
// // // // // //   console.log("Client connected to path:", path);

// // // // // //   if (path === "/price") {
// // // // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // // //   } else if (path === "/fund") {
// // // // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // // // // //   } else {
// // // // // //     // Root WS: forward both price and fund messages
// // // // // //     // ws.send(JSON.stringify({ message: "Connected to root WS! Receiving both price & fund updates." }));

// // // // // //     // Proxy both backends
// // // // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");

// // // // // //     ws.on("message", (msg) => {
// // // // // //       console.log("Received from client:", msg.toString());
// // // // // //       ws.send(`Echo: ${msg}`);
// // // // // //     });

// // // // // //     ws.on("close", () => console.log("Client disconnected from root WS"));
// // // // // //   }
// // // // // // });

// // // // // // // ----------------- Start Server -----------------
// // // // // // const PORT = 5000;
// // // // // // server.listen(PORT, () => {
// // // // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // // // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // // // // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`);
// // // // // // });



// // // // // const express = require("express");
// // // // // const http = require("http");
// // // // // const axios = require("axios");
// // // // // const WebSocket = require("ws");
// // // // // const cors = require("cors");

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // ----------------- REST API Proxy -----------------
// // // // // app.get("/gateway/price", async (req, res) => {
// // // // //   try {
// // // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // // //     res.json(response.data);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // app.get("/gateway/fund", async (req, res) => {
// // // // //   try {
// // // // //     const response = await axios.get("http://localhost:4008/fund");
// // // // //     res.json(response.data);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // // ----------------- WebSocket Proxy Helper -----------------
// // // // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // // // //   let backendWS = new WebSocket(sourceUrl);

// // // // //   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

// // // // //   backendWS.on("message", (msg) => {
// // // // //     try {
// // // // //       const data = JSON.parse(msg);
// // // // //       if (expectedType === "all" || data.type === expectedType) {
// // // // //         clientWS.send(JSON.stringify({ type: data.type || expectedType, data: data }));
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Invalid WS message:", msg.toString());
// // // // //     }
// // // // //   });

// // // // //   backendWS.on("error", (err) => {
// // // // //     console.error(`Backend WS error (${sourceUrl}):`, err.message);
// // // // //     setTimeout(() => {
// // // // //       if (clientWS.readyState === WebSocket.OPEN) {
// // // // //         proxyWithFilter(clientWS, sourceUrl, expectedType);
// // // // //       }
// // // // //     }, 2000);
// // // // //   });

// // // // //   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

// // // // //   clientWS.on("close", () => {
// // // // //     if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
// // // // //       backendWS.close();
// // // // //     }
// // // // //   });
// // // // // }

// // // // // // ----------------- Single WebSocket Server -----------------
// // // // // const server = http.createServer(app);
// // // // // const wss = new WebSocket.Server({ server });

// // // // // wss.on("connection", (ws, req) => {
// // // // //   const path = req.url;
// // // // //   console.log("Client connected to path:", path);

// // // // //   if (path === "/price") {
// // // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // // //   } else if (path === "/fund") {
// // // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // // // //   } else {
// // // // //     // Root WS: forward both price and fund messages
// // // // //     // ws.send(JSON.stringify({ message: "Connected to root WS! Receiving both price & fund updates." }));
// // // // //     proxyWithFilter(ws, "ws://localhost:4300", "all");
// // // // //     proxyWithFilter(ws, "ws://localhost:4008", "all");

// // // // //     ws.on("message", (msg) => {
// // // // //       console.log("Received from client:", msg.toString());
// // // // //       ws.send(`Echo: ${msg}`);
// // // // //     });

// // // // //     ws.on("close", () => console.log("Client disconnected from root WS"));
// // // // //   }
// // // // // });

// // // // // // ----------------- Start Server -----------------
// // // // // const PORT = 5000;
// // // // // server.listen(PORT, () => {
// // // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // // // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`);
// // // // // });



// // // // const express = require("express");
// // // // const http = require("http");
// // // // const axios = require("axios");
// // // // const WebSocket = require("ws");
// // // // const cors = require("cors");

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // REST API Proxy
// // // // app.get("/gateway/price", async (req, res) => {
// // // //   try {
// // // //     const response = await axios.get("http://localhost:4300/api/price");
// // // //     res.json(response.data);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // app.get("/gateway/fund", async (req, res) => {
// // // //   try {
// // // //     const response = await axios.get("http://localhost:4008/fund");
// // // //     res.json(response.data);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // WebSocket Proxy Helper
// // // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // // //   let backendWS = new WebSocket(sourceUrl);

// // // //   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

// // // //   backendWS.on("message", (msg) => {
// // // //     try {
// // // //       const data = JSON.parse(msg);
// // // //       if (expectedType === "all" || data.type === expectedType) {
// // // //         clientWS.send(JSON.stringify({ type: data.type || expectedType, data: data }));
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Invalid WS message:", msg.toString());
// // // //     }
// // // //   });

// // // //   backendWS.on("error", (err) => {
// // // //     console.error(`Backend WS error (${sourceUrl}):`, err.message);
// // // //     setTimeout(() => {
// // // //       if (clientWS.readyState === WebSocket.OPEN) {
// // // //         proxyWithFilter(clientWS, sourceUrl, expectedType);
// // // //       }
// // // //     }, 2000);
// // // //   });

// // // //   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

// // // //   clientWS.on("close", () => {
// // // //     if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
// // // //       backendWS.close();
// // // //     }
// // // //   });
// // // // }

// // // // // WebSocket Server
// // // // const server = http.createServer(app);
// // // // const wss = new WebSocket.Server({ server });

// // // // wss.on("connection", (ws, req) => {
// // // //   const path = req.url;
// // // //   console.log("Client connected to path:", path);

// // // //   if (path === "/price") {
// // // //     // Connect directly to price backend
// // // //     proxyWithFilter(ws, "ws://localhost:4300", "price");
// // // //   } else if (path === "/fund") {
// // // //     // Connect directly to fund backend
// // // //     proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // // //   } else {
// // // //     // Root WS: forward both price and fund messages
// // // //     // ws.send(JSON.stringify({ message: "Connected to root WS! Receiving both price & fund updates." }));
// // // //     proxyWithFilter(ws, "ws://localhost:4300", "all");
// // // //     proxyWithFilter(ws, "ws://localhost:4008", "all");

// // // //     ws.on("message", (msg) => {
// // // //       console.log("Received from client:", msg.toString());
// // // //       ws.send(`Echo: ${msg}`);
// // // //     });

// // // //     ws.on("close", () => console.log("Client disconnected from root WS"));
// // // //   }
// // // // });

// // // // // Start server
// // // // const PORT = 5000;
// // // // server.listen(PORT, () => {
// // // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`);
// // // // });


// // // const express = require("express");
// // // const http = require("http");
// // // const axios = require("axios");
// // // const WebSocket = require("ws");
// // // const cors = require("cors");

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // REST API Proxy
// // // app.get("/gateway/price", async (req, res) => {
// // //   try {
// // //     const response = await axios.get("http://localhost:4300/api/price");
// // //     res.json(response.data);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // app.get("/gateway/fund", async (req, res) => {
// // //   try {
// // //     const response = await axios.get("http://localhost:4008/fund");
// // //     res.json(response.data);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // WebSocket Proxy Helper
// // // function proxyWithFilter(clientWS, sourceUrl, expectedType) {
// // //   const backendWS = new WebSocket(sourceUrl);

// // //   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

// // //   backendWS.on("message", (msg) => {
// // //     try {
// // //       const data = JSON.parse(msg);
// // //       // send message if type matches or if 'all'
// // //       if (expectedType === "all" || data.type === expectedType) {
// // //         clientWS.send(JSON.stringify(data));
// // //       }
// // //     } catch (err) {
// // //       console.error("Invalid WS message:", msg.toString());
// // //     }
// // //   });

// // //   backendWS.on("error", (err) => {
// // //     console.error(`Backend WS error (${sourceUrl}):`, err.message);
// // //     // retry connection after 2 seconds
// // //     setTimeout(() => {
// // //       if (clientWS.readyState === WebSocket.OPEN) {
// // //         proxyWithFilter(clientWS, sourceUrl, expectedType);
// // //       }
// // //     }, 2000);
// // //   });

// // //   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

// // //   clientWS.on("close", () => {
// // //     if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
// // //       backendWS.close();
// // //     }
// // //   });
// // // }

// // // // WebSocket Server
// // // const server = http.createServer(app);
// // // const wss = new WebSocket.Server({ server });

// // // wss.on("connection", (ws, req) => {
// // //   const path = req.url;
// // //   console.log("Client connected to path:", path);

// // //   switch (path) {
// // //     case "/price":
// // //       // Proxy only price updates
// // //       proxyWithFilter(ws, "ws://localhost:4300", "price");
// // //       break;
// // //     case "/fund":
// // //       // Proxy only fund updates
// // //       proxyWithFilter(ws, "ws://localhost:4008", "fund");
// // //       break;
// // //     case "/":
// // //     default:
// // //       // Root WS: proxy both price and fund updates
// // //       proxyWithFilter(ws, "ws://localhost:4300", "all");
// // //       proxyWithFilter(ws, "ws://localhost:4008", "all");
// // //       break;
// // //   }

// // //   ws.on("message", (msg) => {
// // //     console.log("Received from client:", msg.toString());
// // //     // optional echo
// // //     ws.send(`Echo: ${msg}`);
// // //   });

// // //   ws.on("close", () => console.log("Client disconnected from WS:", path));
// // // });

// // // // Start server
// // // const PORT = 5000;
// // // server.listen(PORT, () => {
// // //   console.log(`API Gateway running on http://localhost:${PORT}`);
// // //   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
// // //   console.log(`WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`);
// // // });



// const express = require("express");
// const http = require("http");
// const axios = require("axios");
// const WebSocket = require("ws");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());







// // ---------------- REST API Proxy ----------------
// app.get("/gateway/price", async (req, res) => {
//   try {
//     const response = await axios.get("http://localhost:4300/api/price");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/gateway/fund", async (req, res) => {
//   try {
//     const response = await axios.get("http://localhost:4008/fund");
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- WebSocket Proxy Helper ----------------
// function proxyWithFilter(clientWS, sourceUrl, expectedType) {
//   const backendWS = new WebSocket(sourceUrl);

//   backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

//   backendWS.on("message", (msg) => {
//     try {
//       const data = JSON.parse(msg);

//       // send all messages if expectedType is 'all' or if type matches, or if type is missing
//       if (
//         expectedType === "all" ||
//         data.type === expectedType ||
//         !data.type
//       ) {
//         clientWS.send(JSON.stringify(data));
//       }
//     } catch (err) {
//       console.error("Invalid WS message:", msg.toString());
//     }
//   });

//   backendWS.on("error", (err) => {
//     console.error(`Backend WS error (${sourceUrl}):`, err.message);
//     setTimeout(() => {
//       if (clientWS.readyState === WebSocket.OPEN) {
//         proxyWithFilter(clientWS, sourceUrl, expectedType);
//       }
//     }, 2000);
//   });

//   backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

//   clientWS.on("close", () => {
//     if (
//       backendWS.readyState === WebSocket.OPEN ||
//       backendWS.readyState === WebSocket.CONNECTING
//     ) {
//       backendWS.close();
//     }
//   });
// }

// // ---------------- WebSocket Server ----------------
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws, req) => {
//   const path = req.url;
//   console.log("Client connected to path:", path);

//   switch (path) {
//     case "/price":
//       proxyWithFilter(ws, "ws://localhost:4300", "price");
//       break;
//     case "/fund":
//       proxyWithFilter(ws, "ws://localhost:4008", "fund");
//       break;
//     case "/":
//     default:
//       proxyWithFilter(ws, "ws://localhost:4300", "all");
//       proxyWithFilter(ws, "ws://localhost:4008", "all");
//       break;
//   }

//   ws.on("message", (msg) => {
//     console.log(`Received from client [${path}]:`, msg.toString());
//     ws.send(`Echo: ${msg}`);
//   });

//   ws.on("close", () => console.log(`Client disconnected from WS: ${path}`));
// });

// // ---------------- Start Server ----------------
// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`API Gateway running on http://localhost:${PORT}`);
//   console.log(`REST endpoints: /gateway/price , /gateway/fund`);
//   console.log(
//     `WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`
//   );
// });


const express = require("express");
const http = require("http");
const axios = require("axios");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Landing Page ----------------
app.get("/", async (req, res) => {
  try {
    const priceRes = await axios.get("http://localhost:4300/api/price");
    const fundRes = await axios.get("http://localhost:4008/fund");

    res.json({
      message: "Latest data from API Gateway",
      price: priceRes.data,
      fund: fundRes.data,
      wsEndpoints: {
        price: "ws://localhost:5000/price",
        fund: "ws://localhost:5000/fund",
        all: "ws://localhost:5000/"
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- REST API Proxy ----------------
app.get("/gateway/price", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4300/api/price");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/gateway/fund", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4008/fund");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- WebSocket Proxy Helper ----------------
function proxyWithFilter(clientWS, sourceUrl, expectedType) {
  const backendWS = new WebSocket(sourceUrl);

  backendWS.on("open", () => console.log(`Connected to backend WS: ${sourceUrl}`));

  backendWS.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      if (expectedType === "all" || data.type === expectedType || !data.type) {
        clientWS.send(JSON.stringify(data));
      }
    } catch (err) {
      console.error("Invalid WS message:", msg.toString());
    }
  });

  backendWS.on("error", (err) => {
    console.error(`Backend WS error (${sourceUrl}):`, err.message);
    setTimeout(() => {
      if (clientWS.readyState === WebSocket.OPEN) {
        proxyWithFilter(clientWS, sourceUrl, expectedType);
      }
    }, 2000);
  });

  backendWS.on("close", () => console.log(`Disconnected from backend WS: ${sourceUrl}`));

  clientWS.on("close", () => {
    if (backendWS.readyState === WebSocket.OPEN || backendWS.readyState === WebSocket.CONNECTING) {
      backendWS.close();
    }
  });
}

// ---------------- WebSocket Server ----------------
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  const path = req.url;
  console.log("Client connected to path:", path);

  switch (path) {
    case "/price":
      proxyWithFilter(ws, "ws://localhost:4300", "price");
      break;
    case "/fund":
      proxyWithFilter(ws, "ws://localhost:4008", "fund");
      break;
    case "/":
    default:
      proxyWithFilter(ws, "ws://localhost:4300", "all");
      proxyWithFilter(ws, "ws://localhost:4008", "all");
      break;
  }

  ws.on("message", (msg) => {
    console.log(`Received from client [${path}]:`, msg.toString());
    ws.send(`Echo: ${msg}`);
  });

  ws.on("close", () => console.log(`Client disconnected from WS: ${path}`));
});

// ---------------- Start Server ----------------
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log(`REST endpoints: /gateway/price , /gateway/fund`);
  console.log(
    `WebSocket endpoints: ws://localhost:${PORT}/price , ws://localhost:${PORT}/fund , ws://localhost:${PORT}/`
  );
});
