import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listHistoire } from '../../actions/histoireAction.js'
import './histoire.css'
import axios from 'axios';

const Histoire = () => {
    
    const histoireList = useSelector(state => state.histoireList);
    const { histoires, loading, error } = histoireList;
   
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(listHistoire());
    
    }, [dispatch]);

    return (
        loading? <div>Loading...</div>:
        error? <div>{error}</div>:
        <div className="histoire">
           <h1>NOTRE HISTOIRE</h1>
           <img src="" alt=""/>
           {histoires.map(histoire  => {
               return histoire ?
           <p key={histoire._id}>{histoire.description}</p> :""
           }
           
           )}
          
        </div>
    );
};

export default Histoire;