import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react'
import { useDispatch, useSelector } from 'react-redux';
import { listHistoire, updateHistoire } from '../../actions/histoireAction.js'
import './histoire.css'
import axios from 'axios';

const Histoire = () => {

    const [ description, setDescription ] = useState('');
    const [ id, setId ] = useState('');
    
    const histoireList = useSelector(state => state.histoireList);
    const { histoires, loading, error } = histoireList;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
   
    const dispatch = useDispatch();

    const updateDescriptionPage = async (e) => {
        try {
            e.preventDefault()
            dispatch(updateHistoire({ _id:id, description}))
            setTimeout(function(){
                window.location.reload(false);}, 100);
        } catch (error) {
            console.log(error);
        }
}

    useEffect(() => {

        dispatch(listHistoire());
        console.log(histoires);
    
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

            { userInfo &&
            <form className="histoire-input" onSubmit={updateDescriptionPage}>
                {histoires.map(histoire  => {
               return histoire ?
               <div>
            <textarea name="" id="" cols="30" rows="10" key={histoire._id} placeholder={histoire.description} onChange={ (e) => setDescription(e.target.value)}>
            </textarea>
            <button onClick={() => setId(histoire._id)} type="submit">VALIDER</button>
            </div>
            :""})}
            </form> }

          
        </div>
    );
};

export default Histoire;