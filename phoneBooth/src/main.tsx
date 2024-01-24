import React from "react";
import ReactDOM from "react-dom/client";

import { Connector } from "./@mqtt-react-hooks";

import "./index.css";
import "./tailwind.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Connector
    brokerUrl={"ws://45.55.107.14:9001"}
    options={{
      keepalive: 10,
      username: "sup3rnova",
      password: "2zd8LCk5k5ETEqw1aM77NTwr2RwsfWX6",
      clientId: "sup3rnova-pb-" + Math.random().toString(16).substring(2, 8),
    }}
    parserMethod={(msg) => JSON.parse(msg) || "error parsing"}
  >
    <App />
  </Connector>
);
