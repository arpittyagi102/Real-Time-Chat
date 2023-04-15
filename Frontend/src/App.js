import React, { useEffect, useState } from 'react';
import Messagebox from './components/Messagebox.js';
//import { socket } from './socket.js';
import io from 'socket.io-client';
//import { useEffect } from 'react';

function App() {

  /*const [socket, setSocket] = useState(io.connect('http://localhost:4000'))
  useEffect(() => {
      const newSocket = io.connect('http://localhost:4000');
      setSocket(newSocket);
    
      return ()=>{newSocket.disconnect();}
    }, [])*/

  const socket = io.connect('http://localhost:4000');


  const [messagelist,addmessage]=useState([]);
var inputvalue;

  const sendmessage=()=>{
    socket.emit('send-message',inputvalue);
    console.log("The message has been sent from frontend");
  }

  useEffect(() => {
    // Add event listener for "recieve-message" event
    const handleReceiveMessage = (message) => {
      console.log("The message has been Received by frontend");
      addmessage(prevMessages => [...prevMessages, <Messagebox message={message} />]);
    }
    socket.on("recieve-message", handleReceiveMessage);

    // Cleanup function
    return () => {
      // Remove event listener when component unmounts
      socket.off("recieve-message", handleReceiveMessage);
    };
  }, []);
  

  const inputchanged = (data) =>{
    inputvalue=data.target.value;
  }

  return (
    <>
      <div className='container'>
        <Messagebox message={"Hello"} />
        {/* Render Messagebox components for each message in messagelist */}
  {messagelist.map((message) => (
    <Messagebox  message={message} />
  ))}
        <div style={{ position: "absolute", bottom: "20px",width:"100%", display:"flex"}}>
                <input type="text" className="form-control w-75 d-inline-block m-2 border-5" value={inputvalue} onChange={inputchanged}/>
                <button className="btn btn-primary m-2" onClick={sendmessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
