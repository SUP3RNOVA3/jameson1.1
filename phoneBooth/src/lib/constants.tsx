export enum MQTT_TOPICS {
  CALL_RING = "call/ring",
  CALL_INIT = "call/init",
  CALL_ACCEPT = "call/accept",
  CALL_CONNECTING = "call/connecting",
  CALL_CONNECTED = "call/connected",
  CALL_REJECT = "call/reject",
  CALL_END = "call/end",
  CALL_STARTED = "call/started",
}


export enum ROLES {
  INITIATOR = "initiator",
  RECEIVER = "receiver",
}

export enum SOCKET_TOPICS {
  GET_MAC = "GET_MAC",
  GET_TOKEN = "GET_TOKEN",

  HEADSET_STATUS = "__HEADSET_STATUS",

  __MAC = "__MAC", 
  __TOKEN = "__TOKEN",

}

export const API_KEY = "47642261"