import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useMqttState } from "~/@mqtt-react-hooks";

import { MQTT_TOPICS } from "~/lib/constants";
import { AppContext, IVideoInfo } from "~/components/AppContext";

function NewCall() {
  const navigate = useNavigate();
  const { boothInfo, updateBoothInfo, videoInfo, updateVideoInfo } = useContext(AppContext);

  const { client } = useMqttState();

  const onNext = () => {
    console.log("updating booth info to subscriber");
    updateBoothInfo({ ...boothInfo, role: "subscriber" });

    const _videoInfo: IVideoInfo = {
      ...videoInfo,
      status: "waiting",
      receiver: boothInfo?.mac,
    };

    updateVideoInfo(_videoInfo);

    const payload = { ..._videoInfo };

    client?.publish(MQTT_TOPICS.CALL_ACCEPT, JSON.stringify(payload));

    navigate(`/start/receiver-ack`);
  };

  return (
    <>
      <div className="flex flex-col justify-between mx-auto items-center h-full">
        <div className="mt-80  ">
          <h1 className="text-5xl mb-10 uppercase animate-bounce">Incoming call?</h1>
          <h1 className="text-5xl mb-10 uppercase animate-bounce">Incoming call?</h1>
          <h1 className="text-5xl mb-10 uppercase animate-ping">Ring Ring Ring Ring</h1>
        </div>
        <div className="text-3xl">
          <h2 className="mt-5">
            If you connect with a stranger for atleast a minute, both of you will get a free drink. Do you accept?
          </h2>

          <h2 className="mt-5">Answer this call by picking up the handset</h2>
        </div>
        <button className="m-5 p-5 w-3/4 mx-auto" onClick={onNext}>
          Or use speaker instead?
        </button>
      </div>
    </>
  );
}

export default NewCall;
