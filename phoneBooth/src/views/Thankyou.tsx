import sup3rnovaLogo from "~/assets/logo.svg";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useMqttState } from "~/@mqtt-react-hooks";

import Input from "~/lib/Input";
import Checkbox from "~/lib/Checkbox";

import { AppContext } from "~/components/AppContext";
import { MQTT_TOPICS, ROLES } from "~/lib/constants";
import Select from "~/lib/Select";

const Thankyou = () => {
  const navigate = useNavigate();
  const { client } = useMqttState();
  const { videoInfo } = useContext(AppContext);

  //get role from url
  const { search } = useLocation();
  const role = new URLSearchParams(search).get("role") || ROLES.INITIATOR;
  const ageArray = Array.from({ length: 63 }, (_, i) => i + 18);

  const onNext = () => {
    //on next

    setTimeout(() => {
      navigate(`/`);
    }, 1000);
  };

  return (
    <>
      <div className="container min-w-[600px] h-screen flex flex-col items-start w-screen">
        <div className="rounded-full bg-black  flex h-26 m-4" onClick={() => navigate("/")}>
          <img src={sup3rnovaLogo} className="logo react" alt="logo" />
        </div>
        <div className="h-screen-minus-100 w-full">
          <div className="flex flex-col justify-between mx-auto mt-10 ">
            <h1 className="text-6xl uppercase">Thank you</h1>

            <h2 className="mt-10 text-2xl w-3/4 mx-auto leading-10 ">
              {" "}
              Thank you for using sup3rnova phone booth. Please leave your details below to receive your free drink
              voucher.
            </h2>
          </div>

          {/*Form to get user name, last name, email and phone and ask them to accept t&C */}
          <form className="flex flex-col w-3/4 mx-auto mt-10">
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

            
          </form>

          <button className="m-5 p-5 w-3/4 mx-auto" onClick={onNext}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Thankyou;
