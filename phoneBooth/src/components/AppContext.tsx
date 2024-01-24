import { createContext } from "react";
import { IMessageStructure } from "../@mqtt-react-hooks";

export interface IBoothInfo {
  id: string;
  name: string;
  mac: string;
  role: "subscriber" | "publisher" | null ;
}

export interface IVideoInfo {
  sessionId: string;
  token: string;
  incomming_sessionId: string;
  incomming_token: string;
  initiator: string;
  receiver: string;
  status: "idle" | "initiating" | "connecting" | "waiting" | "connected" | "ringing" | "ended";
  endedBy?: string;
}



export const defaultVideoInfo: IVideoInfo = {
  sessionId: "",
  token: "",
  incomming_sessionId: "",
  status: "idle",
  incomming_token: "",
  initiator: "",
  receiver: "",
}


export interface IContext {
  boothInfo: IBoothInfo;
  videoInfo: IVideoInfo;
  //mqttPayload: { topic?: string | null; message?: string |  IMessageStructure | null  };
  updateBoothInfo: (boothInfo: IBoothInfo) => void;
  updateVideoInfo: (videoInfo: IVideoInfo) => void;
}

export const AppContext = createContext<IContext>({
  boothInfo: {
    id: "",
    name: "",
    mac: "",
    role: null,
  },
  videoInfo: {
    ...defaultVideoInfo
  },
  
  updateBoothInfo: (boothInfo: IBoothInfo) => {},
  updateVideoInfo: (videoInfo: IVideoInfo) => {},
});

