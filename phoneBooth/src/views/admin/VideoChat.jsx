import '@vonage/video-publisher/video-publisher.js';
import '@vonage/video-subscribers/video-subscribers.js';
import { useEffect, useRef } from 'react';




const VideoChat = () => {
  const publisher = useRef(null);
  const subscribers = useRef(null);
  
  

  useEffect(() => {
    // Initialize OpenTok
    const OT = window.OT;
    const apiKey = '47682921';
    const sessionId = '2_MX40NzY4MjkyMX5-MTY3ODg4NTk4OTU3NX4rRldBSXlEVzBmL0xoY0NTMXpsSFRueEN-fn4';
    const token = 'T1==cGFydG5lcl9pZD00NzY4MjkyMSZzaWc9NWVmZWEzYzVlMzhlZTY5NjU0NGYwYWQ0MTQ2ZTg3YzIzN2VmZmViYjpzZXNzaW9uX2lkPTJfTVg0ME56WTRNamt5TVg1LU1UWTNPRGc0TlRrNE9UVTNOWDRyUmxkQlNYbEVWekJtTDB4b1kwTlRNWHBzU0ZSdWVFTi1mbjQmY3JlYXRlX3RpbWU9MTY3ODg4NjA1MyZub25jZT0wLjI2Njk5NjIzNDc5ODk1NDk2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2ODE0NzgwNTEmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

    // Initialize an OpenTok Session object
    const session = OT.initSession(apiKey, sessionId);

    // Set session and token for Web Components
    publisher.current.session = session;
    publisher.current.token = token;
    subscribers.current.session = session;
    subscribers.current.token = token;
    

  });


  return (
    <div>
      VideoChat
      <div className="App-container">
        <section className="App-section-publisher">
          <fieldset>
            <legend>Publisher</legend>
            <video-publisher width="360px" height="240px" ref={publisher}></video-publisher>
          </fieldset>
          
          
        </section>
        <section className="App-section-subscribers">
          <fieldset>
            <legend>Subscribers</legend>
            <video-subscribers width="360px" height="240px" ref={subscribers}></video-subscribers>
          </fieldset>
        </section>
      </div>
    </div>
  );
};

export default VideoChat;
