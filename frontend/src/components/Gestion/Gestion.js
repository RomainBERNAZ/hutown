import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Gestion.css'
import swal from 'sweetalert';
import Modal from "../Modal/modal";
import { updatePage } from '../../actions/pageActions'
import { useDispatch } from 'react-redux';
import { listPages } from '../../actions/pageActions'
import { listProducts } from "../../actions/productActions";


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
                swal({
                    title: "Le nom de l'artiste est modifié !",
                    text: "Tu peux désormais ajouter des articles le concernant et sa description apparaitra sur sa page.",
                    icon: "success",
                    button: "Fermer",
                  });
            } catch (error) {
                console.log(error);
            }
    }

    const openModal = () => {
        let modal = document.getElementById("modal")
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
        modal.style.display = "block";
      };


    useEffect(() => {
        dispatch(listProducts());
        dispatch(listPages());
    }, [dispatch]);


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
                                    <option value="four">Quatrième page</option>
                                    <option value="five">Cinquième page</option>
                                    <option value="six">Sixième page</option> 
                                </select>
                                <button type="submit"><i className="fas fa-search"></i></button>
                        </form>
                        <h2>AJOUTER DES PRODUITS</h2>
                        <div className='iconAdd'>
                            <i onClick={openModal} className="far fa-plus-square"></i>
                        </div>
                        <Modal />
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
    </div>
    );
};

export default Gestion;