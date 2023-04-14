import React, { useState } from 'react';
import Messagebox from './components/Messagebox.js';
import io from 'socket.io-client'

function App() {

  const socket = io.connect("ws://localhost:4000")
  const [messagelist,addmessage]=useState([]);
var inputvalue;
  const sendmessage=()=>{
    socket.emit('send-message',inputvalue);
    console.log("The message has been sent from frontend");
  }
  socket.on("recieve-message",(message)=>{
    console.log("The message has been Received by frontend");
    addmessage((prevmessages)=>{
      return [...prevmessages,<Messagebox message={message}/>]});
  })

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
