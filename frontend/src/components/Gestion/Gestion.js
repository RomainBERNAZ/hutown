import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Gestion.css'
import { updatePage } from '../../actions/pageActions'
import { useDispatch } from 'react-redux'
import Tableau from '../Tableau/Tableau';

const Gestion = () => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('')
    const [ category, setCategory ] = useState('');
    const [ pages, setPages ] = useState([]);
    const [ id, setId ] = useState('');

    const dispatch = useDispatch();

    const handleListPage = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get('/api/pages/');
            const data = await res.data;
            setPages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateInfoPage = async (e) => {
            try {
                e.preventDefault()
                dispatch(updatePage({_id:id, title, description, category}))
                alert('Mise à jour réussie !')
            } catch (error) {
                console.log(error);
            }


        console.log(title, description, category);

    }

    useEffect(() => {
    }, []);


    return (
           
        <div>
        <div className="gestion">
                <div className="first-section">
                    <div className="title-category">
                        <h2>INFOS</h2>
                        <form className="category-photo" onSubmit={handleListPage}>
                                <h3>CHOIX DE LA PAGE</h3>
                                <select name="" id="" onChange={ (e) => setCategory(e.target.value)}>
                                    <option defaultChecked>Choisir une catégorie</option>
                                    <option value="first">Première page</option>
                                    <option value="second">Deuxième page</option>
                                    <option value="third">Troisième page</option>
                                </select>
                                <button type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                
                    {pages.map(page  => {
                return page.category === category ?
                    <form className="description-page-upload" key={page._id} onSubmit={updateInfoPage}>
                        <input required type="text" placeholder={page.title} onChange={(e) => setTitle(e.target.value)}/>
                        <textarea required name="" id="" cols="50" rows="10" placeholder={page.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button onClick={() => setId(page._id)} type="submit">VALIDER</button>
                    </form>: ''
            }
                )}
                    
                </div>
        </div>
        <div className="tableau-container">
            <Tableau/>
        </div>
    </div>
    );
};

export default Gestion;