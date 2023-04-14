import React from "react";

export default function Input() {
    return (
        <>
            <div style={{ position: "absolute", bottom: "20px",width:"100%", display:"flex",justifyContent:"center"}}>
                <input type="text" className="form-control w-75 d-inline-block m-2 border-5" />
                <button className="btn btn-primary m-2">Send</button>
            </div>
        </>
    )
}