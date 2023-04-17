import React, { useEffect, useState } from 'react';
import Messagebox from './components/Messagebox.js';
import io from 'socket.io-client';

function Main(props) {

    const socket = io.connect('http://localhost:4000');
    const [messagelist, addmessage] = useState([]);
    const [inputvalue,setinputvalue]=useState('')

    const sendmessage = () => {
        socket.emit('send-message', props.name + " : "+inputvalue);
        console.log("The message has been sent from frontend");
        setinputvalue('');
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

    const inputchanged = (data) => {
       setinputvalue(data.target.value);
       console.log(data.nativeEvent.data);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendmessage();
        }
    }

    return (
        <>
            <div className='container'>
                <Messagebox message={"Hello"} />
                {/* Render Messagebox components for each message in messagelist */}
                {messagelist.map((message) => (
                    <Messagebox message={message} />
                ))}
                <div style={{ position: "absolute", bottom: "20px", width: "100%", display: "flex" }}>
                    <input type="text" className="form-control w-75 d-inline-block m-2 border-5" value={inputvalue} onChange={inputchanged} onKeyDown={handleKeyDown}/>
                    <button className="btn btn-primary m-2" onClick={sendmessage}>Send</button>
                </div>
            </div>
        </>
    );
}

export default Main;
