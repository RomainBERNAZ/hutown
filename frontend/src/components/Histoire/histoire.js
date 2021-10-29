import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHistoire, updateHistoire } from '../../actions/histoireAction.js'
import { motion } from "framer-motion"
import contour from './remplissage.jpg'
import './histoire.css'

const Histoire = () => {

    const [ description, setDescription ] = useState('');
    const [ id, setId ] = useState('');
    
    const histoireList = useSelector(state => state.histoireList);
    const { histoires, loading, error } = histoireList;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =userLogin;
   
    const dispatch = useDispatch();

    setTimeout(() => {
        
    }, 1800);

   /*  const variants = { 
      hidden: { opacity: 1}, 
      visible: { 
        opacity: 0,
        zIndex:0,
        transition:{
          duration:1.2,
          ease: [0.7, 0, 0.84, 0],
        zIndex:{
          delay:1.2
        } 
        }
      } 
    } */

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
    }, [dispatch]);

    return (
        loading? <div className="loadingTest"></div>:
        error? <div>{error}</div>:
        <motion.div initial={{ opacity: 0 }}
                animate={{ opacity:1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 2 }}>
        <div className="histoire">
           <h1>NOTRE HISTOIRE</h1>
           <img src={contour} alt=""/>
           
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
        </motion.div>
    );
};

export default Histoire;