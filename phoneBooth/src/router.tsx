import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import InitiatorAcknowledge from "./views/initiator/InitiatorAck";
import ReceiverAcknowledge from "./views/receiver/ReceiverAck";
import Call from "./views/Call";
import NewCall from "./views/receiver/NewCall";
import Start from "./views/start";
import Thankyou from "./views/Thankyou";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
    element: <InitiatorAcknowledge />,
  },
  {
    path: "start",
    element: <Start />,
    children: [
      {
        path: "initiator-ack",
        element: <InitiatorAcknowledge />,
      },
      {
        path: "receiver-ack",
        element: <ReceiverAcknowledge />,
      },
      {
        path: "new-call",
        element: <NewCall />,
      },
      {
        path: "call",
        element: <Call />,
      },
    ],
  },

  {
    path: "/initiator-ack",
    element: <InitiatorAcknowledge />,
  },
  {
    path: "/receiver-ack",
    element: <ReceiverAcknowledge />,
  },
  {
    path: "/new-call",
    element: <NewCall />,
  },
  {
    path: "/call",
    element: <Call />,
  },
  {
    path: "thankyou",
    element: <Thankyou />,
  },
]);

export default router;
