import React, { useEffect }from 'react';
import './main.css'
//import road from '../main/hauntedroad.jpg'

const Main = () => {

    useEffect(() => {
    },[])



    return (
        <div className="main" id="main">
            <ul >
                <li><a href='/hustle'><button id="Hustle" className="Hustle">Hustle</button></a></li>
                <li><button id="Nick" className="Nick">Nick</button></li>
                <li><button id="Outdoors" className="Outdoors">Outdoors</button></li>
            </ul>

        </div>
    )
}

export default Main;