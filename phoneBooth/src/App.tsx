import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AppContext, IBoothInfo, IVideoInfo } from "./components/AppContext";


const App = () => {
  const [_boothInfo, _updateBoothInfo] = useState<IBoothInfo>();
  const [_videoInfo, _updateVideoInfo] = useState<IVideoInfo>({
    sessionId: "",
    token: "",
    incomming_sessionId: "",
    incomming_token: "",
    status: "idle",
    initiator: "",
    receiver: "",
  });

  
  useEffect(() => {
    const boothInfo: IBoothInfo = {
      id: randomString(18),
      name: randomString(7),
      mac: "",
      role: "subscriber",
    };

    _updateBoothInfo(boothInfo);
  }, []);

  return (
    <AppContext.Provider
      value={{
        boothInfo: _boothInfo as IBoothInfo,
        updateBoothInfo: _updateBoothInfo,
        videoInfo: _videoInfo as IVideoInfo,
        updateVideoInfo: _updateVideoInfo,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;

//generate random string ending with numeric val
const randomString = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + Math.floor(Math.random() * 10);
};

// //generate random MacNo
// const randomMacNo = () => {
//   let result = "";
//   const characters = "0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < 12; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };



  // const { message: paylaod } = useSubscription([
  //   MQTT_TOPICS.CALL_RING,
  //   MQTT_TOPICS.CALL_ACCEPT,
  //   MQTT_TOPICS.CALL_STARTED,
  //   MQTT_TOPICS.CALL_END,
  // ]);

  // useEffect(() => {
  //   onPayloadRecieved(paylaod);
  // }, [paylaod]);

  // const parsePayload = (payloadMessage: string | IMessageStructure) =>
  //   typeof payloadMessage === "string" ? JSON.parse(payloadMessage) : payloadMessage;


  // const onCallRing = (payload: any) => {
  //   const { sessionId, token, initiator } = payload;

  //   if (!sessionId || !token || !initiator) return;

  //   console.log(initiator, _boothInfo?.mac);
  //   //! Do nothing if initiator is same as booth
  //   if (initiator === _boothInfo?.mac) {
  //     console.log("initiator is same as booth");
  //     return;
  //   }

  //   //! Update video info with new session details and status to 'ringing'
  //   _updateVideoInfo({
  //     sessionId,
  //     token,
  //     status: "ringing",
  //     initiator,
  //     receiver: "",
  //   });
  // };

  //** this is called when receiver sends CALL ACCEPT, so we stops the ringing on the booths other than receiver */
  // const onCallAccept = (payload: any) => {
  //   const { sessionId, token, initiator, receiver } = payload as IVideoInfo;

  //   if (!sessionId || !token || !receiver) return;

  //   //** update to video status to idle if receiver is not same as booth */

  //   if (_boothInfo?.mac !== receiver) {
  //     const __videoInfo: IVideoInfo = {
  //       ..._videoInfo,
  //       receiver: "",
  //       status: "idle",
  //     };

  //     _updateVideoInfo(__videoInfo);
  //   } else {
  //     const __videoInfo: IVideoInfo = {
  //       ..._videoInfo,
  //       receiver: "",
  //       status: "waiting",
  //     };

  //     _updateVideoInfo(__videoInfo);
  //   }
  // };