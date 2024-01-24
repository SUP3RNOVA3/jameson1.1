import sup3rnovaLogo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMqttState, useSubscription } from "../@mqtt-react-hooks";
import { MQTT_TOPICS, SOCKET_TOPICS } from "../lib/constants";
import {
  AppContext,
  IVideoInfo,
  defaultVideoInfo,
} from "../components/AppContext";
import io, { Socket } from "socket.io-client";
import useSocket from "../components/useSocket";

const SOCKET_SERVER_URL = "http://localhost:8000"; // replace with your Socket.IO server URL

function Home() {
  const navigate = useNavigate();

  const { boothInfo, updateBoothInfo, videoInfo, updateVideoInfo } =
    useContext(AppContext);

  const [socket, isLoading, error, addListener, emitMessage] = useSocket();

  const { client } = useMqttState();
  const { message: payload } = useSubscription([MQTT_TOPICS.CALL_RING]);

  useEffect(() => {
    if (socket && socket.connected && !boothInfo?.mac) {
      emitMessage("GET_MAC");
    }
    if (socket && socket.connected) {
      emitMessage("HEADSET_STATUS");
    }
  }, [socket, emitMessage]);

  useEffect(() => {
    updateVideoInfo({ ...defaultVideoInfo });
  }, []);

  useEffect(() => {
    if (socket) {
      const _onHeadsetPicked = addListener("__HEADSET_STATUS", onHeadSetPicked);
      const _onMacAdd = addListener(SOCKET_TOPICS.__MAC, onMacAddressRecieved);

      return () => {
        _onHeadsetPicked();
        _onMacAdd();
      };
    }
  }, [socket, addListener]);

  const onMacAddressRecieved = (mac: string) => {
    console.log("mac recieved", mac);

    const _boothInfo = {
      ...boothInfo,
      mac: mac + "-" + Math.floor(Math.random() * 1000),
    };

    updateBoothInfo(_boothInfo);
  };

  const onHeadSetPicked = (data: any) => {
    console.log("headset picked", data);

    if (data?.picked === true) {
      IntializeCall();
    }
  };

  useEffect(() => {
    onPayloadRecieved(payload);
  }, [payload]);

  useEffect(() => {
    console.log("MQTT Connected", client?.connected);
  }, [client?.connected]);

  const onPayloadRecieved = (payload: any) => {
    console.log("payload recieved", payload);
    console.log(payload);

    if (!payload) return;

    const { topic, message } = payload;

    if (topic === MQTT_TOPICS.CALL_RING) {
      onCALL_RING(message);
    }
  };

  const onCALL_RING = (payload: any) => {
    const { sessionId, token, initiator } = payload;

    //if (videoInfo?.status !== "idle") return;
    if (initiator === boothInfo?.mac) return;

    const _videoInfo: IVideoInfo = {
      ...videoInfo,
      incomming_sessionId: sessionId,
      incomming_token: token,
      status: "ringing",
      initiator: initiator,
      receiver: "",
    };

    console.log("video info", _videoInfo);

    updateVideoInfo(_videoInfo);

    if (boothInfo.mac === "") {
      updateBoothInfo({ ...boothInfo, mac: generateRandomMac() });
    }

    navigate("/start/new-call");
  };

  const IntializeCall = () => {
    navigate("/start/initiator-ack");
  };

  return (
    <>
      <div className="container mx-auto min-w-[600px] h-full flex item-center flex-col">
        <div className="rounded-full bg-black h-96 w-96 flex items-center justify-center m-auto">
          <img src={sup3rnovaLogo} className="logo react" alt="logo" />
        </div>

        <h1 className="">Ready to widen your circle?</h1>
        <h2 className="mt-5">
          {" "}
          Pickup the handset and connect with a stranger
        </h2>

        <button
          className="m-5 p-5 w-3/4 mx-auto"
          onClick={IntializeCall}
          disabled={isLoading}
        >
          Or use speaker instead?
        </button>
      </div>
    </>
  );
}

export default Home;

const generateRandomMac = () => {
  const mac = "00:00:00:00:00:00".replace(/0/g, () => {
    return (~~(Math.random() * 16)).toString(16);
  });

  return mac;
};
