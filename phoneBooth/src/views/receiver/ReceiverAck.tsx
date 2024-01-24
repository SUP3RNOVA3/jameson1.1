import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useMqttState } from "~/@mqtt-react-hooks";

import Input from "~/lib/Input";
import Checkbox from "~/lib/Checkbox";

import { AppContext } from "~/components/AppContext";
import { MQTT_TOPICS, ROLES } from "~/lib/constants";
import Select from "~/lib/Select";

const ReceiverAcknowledge = () => {
  const navigate = useNavigate();
  const { client } = useMqttState();
  const { videoInfo } = useContext(AppContext);

  //get role from url
  const { search } = useLocation();
  const role = new URLSearchParams(search).get("role") || ROLES.INITIATOR;
  const ageArray = Array.from({ length: 63 }, (_, i) => i + 18);
  
  const onNext = () => {
    client?.publish(
      MQTT_TOPICS.CALL_CONNECTING,
      JSON.stringify({ ...videoInfo, status: videoInfo.status === "connecting" ? "connected" : "connecting" })
    );

    navigate(`/start/call?role=${role}`);
  };

  return (
    <>
      <div className="flex flex-col justify-between mx-auto">
        <h1 className="text-6xl uppercase animate-pulse">Incoming call</h1>

        <h2 className="mt-5 text-2xl w-3/4 mx-auto leading-10">
          {" "}
          If you connect with a stranger for at least a minute, both of you will get a free drink. Do you accept?
        </h2>
      </div>

      <form className="flex flex-col w-3/4 mx-auto">
        <div className="flex flex-row ">
          <div className=" w-full text-center mt-8">
            <Select
              name="age"
              isRequired={true}
              type="number"
              placeholder="Tell us your age"
              onChange={(e) => console.log(e.target.value)}
              options={ageArray.map((age) => ({ value: age.toString(), name: age.toString() }))}
              pClassName="large-select"
            />
          </div>
          {/* <div className=" w-1/2">
            <Input
              name="lastname"
              isRequired={true}
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => console.log(e.target.value)}
            />
          </div> */}
        </div>
        {/* <div className="flex flex-row ">
          <div className=" w-1/2">
            <Input
              name="email"
              isRequired={true}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className=" w-1/2">
            <Input
              name="phone"
              isRequired={true}
              type="tel"
              placeholder="Enter your phone number"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div> */}

        <div className="flex flex-row ">
          <div className=" w-full text-center mt-8">
            <Checkbox
              name="t&C"
              pClassName="large-checkbox"
              label="I accept the terms and conditions"
              isRequired={true}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </form>
      {/*Form to get user name, last name, email and phone and ask them to accept t&C */}
      {/* <form className="flex flex-col w-3/4 mx-auto">
        <div className="flex flex-row ">
          <div className=" w-1/2">
            <Input
              name="firstname"
              isRequired={true}
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className=" w-1/2">
            <Input
              name="lastname"
              isRequired={true}
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row ">
          <div className=" w-1/2">
            <Input
              name="email"
              isRequired={true}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className=" w-1/2">
            <Input
              name="phone"
              isRequired={true}
              type="tel"
              placeholder="Enter your phone number"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>

        <Checkbox
          name="t&C"
          label="I accept the terms and conditions"
          isRequired={true}
          onChange={(e) => console.log(e.target.value)}
        />
      </form> */}

      <button className="m-5 p-5 w-3/4 mx-auto" onClick={onNext}>
        Next
      </button>
    </>
  );
};

export default ReceiverAcknowledge;

const TermsAndConditions = () => (
  <>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id felis id ipsum vehicula interdum. Sed viverra
      velit nec lacus eleifend, ac commodo purus varius. Duis auctor pharetra magna, sed ullamcorper quam dignissim a.
      Integer commodo nulla sed risus rhoncus dictum. In hac habitasse platea dictumst. Proin ut velit sed arcu finibus
      fringilla id quis sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Quisque id nisl id mauris volutpat lobortis. Donec accumsan libero a velit tincidunt, at lobortis sapien maximus.
      Nullam aliquam euismod quam non cursus.
    </div>
    <div>
      Suspendisse potenti. Suspendisse lacinia, erat eget vulputate gravida, enim purus luctus lectus, eu scelerisque
      lorem metus vel massa. Vivamus elementum, dui eu malesuada euismod, magna eros commodo sapien, eget tristique leo
      magna in turpis. Fusce commodo ex at nibh pulvinar, eget viverra magna eleifend. Aliquam auctor purus nulla, eu
      consequat nunc feugiat vitae. Nulla facilisi. Sed semper metus velit, eu facilisis quam iaculis id. Sed tristique
      metus in felis dictum, id cursus nisl pharetra. Sed aliquam, enim eget mollis vestibulum, velit magna accumsan
      dui, ac sollicitudin tortor arcu at ante. Sed sit amet elit elit.
    </div>
    <div>
      Vestibulum sagittis leo non mi ultricies, eu laoreet odio cursus. Aliquam non bibendum erat. Curabitur ullamcorper
      fermentum lacus, eget interdum turpis fermentum sit amet. Pellentesque habitant morbi tristique senectus et netus
      et malesuada fames ac turpis egestas. Nunc a bibendum ante, ac facilisis magna. Fusce a nibh ac magna vestibulum
      faucibus. Duis aliquam nulla quis lobortis aliquam. Sed pretium a sapien nec elementum. In hac habitasse platea
      dictumst. Sed lobortis urna vel nisl bibendum faucibus.
    </div>
    <div>
      In eget leo vel velit tincidunt pharetra a nec urna. Curabitur gravida eros nec enim tincidunt malesuada.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer quis mi
      vitae ante finibus aliquam non non orci. Sed eget nibh vitae arcu sagittis tincidunt. Ut euismod ornare lectus,
      eget pretium velit mattis vel. Nullam id nisi dui. Aliquam erat volutpat. Sed iaculis convallis tellus, sit amet
      euismod sapien pharetra eget.
    </div>
  </>
);
