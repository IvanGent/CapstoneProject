import React, { useState, useEffect } from 'react';
import './RandomRoller.css';

function RandomRoller({ restaurants }) {
    const [res, setRes] = useState(restaurants)

    useEffect(() => {

    }, [])

    return (
        <div className='randomRollerCont'>
            {res.map((ele, i) => {
                return (
                    <div key={i}>
                        <img src={ele.website} />
                        <h5 >{ele.name}</h5>
                    </div>
                )
            })}
        </div>
    )
};

export default RandomRoller;