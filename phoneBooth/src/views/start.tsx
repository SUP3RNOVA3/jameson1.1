/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { IMessageStructure, useSubscription } from "~/@mqtt-react-hooks";
import { MQTT_TOPICS } from "../lib/constants";
import { AppContext, IBoothInfo, IVideoInfo } from "~/components/AppContext";

import sup3rnovaLogo from "~/assets/logo.svg";



const Start = () => {
  const navigate = useNavigate();
  const { boothInfo, videoInfo, updateVideoInfo } = useContext(AppContext);
  const { message } = useSubscription([MQTT_TOPICS.CALL_ACCEPT, MQTT_TOPICS.CALL_CONNECTING, MQTT_TOPICS.CALL_CONNECTED, MQTT_TOPICS.CALL_END]);

  useEffect(() => {
    console.log("loadded")
  }, [])

  useEffect(() => {
    onPayloadRecieved(message);
  }, [message]);

  const parsePayload = (payloadMessage: string | IMessageStructure) =>
    typeof payloadMessage === "string" ? JSON.parse(payloadMessage) : payloadMessage;

  const onPayloadRecieved = (payload: any) => {
    if (!payload) return;
   // console.log("payload recieved", payload);
    const { topic, message } = payload;
    const parsedPayload = parsePayload(message);
    switch (topic) {
      case MQTT_TOPICS.CALL_ACCEPT:
        onCallAccept(parsedPayload);
        break;
      case MQTT_TOPICS.CALL_CONNECTING:
        onCallConnecting(parsedPayload);
        break;
      case MQTT_TOPICS.CALL_CONNECTED:
        onCallConnected(parsedPayload);
        break;
      case MQTT_TOPICS.CALL_END:
        console.log("CALL_END", parsedPayload);
        break;
      default:
        break;
    }
  };

  const onCallAccept = (payload: any) => {
    const { initiator, receiver } = payload as IVideoInfo;

    if (!initiator || !receiver) return;
    

    //** update to video status to waiting if initiator is same as booth */
    if (boothInfo?.mac === initiator) {
      updateVideoInfo({ ...videoInfo, receiver, status: "waiting" });
      return;
    }

    //** update to video status to idle if receiver is not same as booth */
    if (videoInfo?.status === "ringing" && boothInfo?.mac !== receiver) {
      const _videoInfo: IVideoInfo = {
        sessionId: videoInfo?.sessionId || "",
        token: videoInfo?.token || "",
        initiator: boothInfo.mac,
        incomming_sessionId: "",
        incomming_token: "",
        receiver: "",
        status: "idle",
      };
      updateVideoInfo(_videoInfo);

      navigate("/");
    }
  };

  const onCallConnecting = (payload: any) => {
    const { initiator, receiver } = payload as IVideoInfo;

    //** if initiator and reciever is not as phone booth return */
    if (boothInfo?.mac !== initiator && boothInfo?.mac !== receiver) return;
    
    
    //** update to video status to connecting if initiator is same as booth */
    const vInfo: IVideoInfo = { ...videoInfo, status: payload.status };

    updateVideoInfo(vInfo);
    return;
  };

  const onCallConnected = (payload: any) => {
    const { initiator, receiver } = payload as IVideoInfo;

    
    //** if initiator and reciever is not as phone booth return */
    if (boothInfo.role === "publisher" && boothInfo?.mac !==  initiator) return;
    if (boothInfo.role === "subscriber" && boothInfo?.mac !== receiver) return;
    
    // console.log("CALL_CONNECTED", payload);
    // console.log(payload.status, payload.status === "connected")

    if (payload.status === "connected") {
      //** update to video status to connecting if initiator is same as booth */
      const vInfo: IVideoInfo = { ...videoInfo, status: payload.status };
      updateVideoInfo(vInfo);
    }
    return;
  };

  return (
     <>
     <div className="container min-w-[600px] h-screen flex flex-col items-start w-screen">
       <div className="rounded-full bg-black  flex h-26 m-4" onClick={() => navigate("/")}>
         <img src={sup3rnovaLogo} className="logo react" alt="logo" />
        </div>
        <div className="h-screen-minus-100 w-full">
       <Outlet />

        </div>
     </div>
   </>
  );
};

export default Start;
