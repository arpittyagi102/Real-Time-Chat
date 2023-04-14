import React from 'react'

export default function Messagebox(props){
    return(
        <>
            <div className='m-1 p-1 border'>{props.message}</div>
        </>
    )
}