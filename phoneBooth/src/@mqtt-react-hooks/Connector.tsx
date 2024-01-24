import React, { useEffect, useState, useCallback, useRef } from "react";

import { connect, MqttClient } from "mqtt";

import MqttContext from "./Context";
import { ConnectorProps } from "./types";

export default function Connector({ children, brokerUrl, options = { keepalive: 0 }, parserMethod }: ConnectorProps) {
  const mountedRef = useRef(true);
  const [connectionStatus, setStatus] = useState<string | Error>("Offline");
  const [client, setClient] = useState<MqttClient | null>(null);

  const mqttConnect = useCallback(async () => {
    setStatus("Connecting");

    if (brokerUrl) {
      const mqtt = connect(brokerUrl, options);

      mqtt.on("connect", () => {
        if (mountedRef.current) {
          setClient(mqtt);
          setStatus("Connected");
        }
      });
      mqtt.on("reconnect", () => {
        if (mountedRef.current) {
          setStatus("Reconnecting");
        }
      });
      mqtt.on("error", (err) => {
        console.log(`Connection error: ${err}`);
        if (mountedRef.current) {
          setStatus(err.message);
        }
      });
      mqtt.on("offline", () => {
        //console.log("offline .......", mountedRef.current);
        if (mountedRef.current) {
          setStatus("Offline");
        }
      });
      mqtt.on("end", () => {
        //console.log("emd ...");
        if (mountedRef.current) {
          setStatus("Offline");
        }
      });
    } else {
      throw new Error("No broker url provided");
    }
  }, [brokerUrl, options]);

  useEffect(() => {
    if (!client) {
      mqttConnect();
    }

    return () => {
      //  console.log("cleanup ....");
      //mountedRef.current = false;
      client?.end(true);
    };
  }, [client, mqttConnect, parserMethod]);

  return <MqttContext.Provider value={{ connectionStatus, client, parserMethod }}>{children}</MqttContext.Provider>;
}
