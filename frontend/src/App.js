import './App.css';

import React, { useEffect } from 'react'
import HttpsRedirect from 'react-https-redirect';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from '../src/components/Header/Header'
import Main from '../src/components/Main/Main'
import Cursor from '../src/components/Cursor/Cursor'
import Contact from '../src/components/Contact/Contact'
import Product from './components/Product/Product';
import login from './components/Login/login';

import Page_1 from './components//Pages_Photo/Page_1';
import Page_2 from './components//Pages_Photo/Page_2';
import Page_3 from './components//Pages_Photo/Page_3';
import Page_4 from './components//Pages_Photo/Page_4';
import Page_5 from './components//Pages_Photo/Page_5';
import Page_6 from './components//Pages_Photo/Page_6';
import Page_7 from './components//Pages_Photo/Page_7';


import Gestion from './components/Gestion/Gestion'

import Panier from './components/Panier/Panier';
import Mentions from './components/Footer/Mentions';
import Utilisation from './components/Footer/Utilisation';
import Vente from './components/Footer/Vente';
import Histoire from './components/Histoire/histoire';
import { AnimatePresence } from "framer-motion"
import Confirmation from './components/ConfirmationPage/Confirmation';
import { listPages } from './actions/pageActions'
import { Resources } from './components/Resources/Resources';

const promise = loadStripe("pk_live_51IIXlWLt56Zxnj4xA4lrJXceCjhbBXrFGB0XzYzhuBEtOjhsebBqj1msbirp0N5WkTsQG7bR18LW5p5Pukl16XBm00Y8TcU9eh");
//const promiseTest = loadStripe("pk_test_51IIXlWLt56Zxnj4x0gcDCnYTt9sHp9tuknedxFbfvoFJMEShJwAlOq7qqvgaaADwASuIwr1d6NQkSCzVatpoLpfb005n72l4vA");


function App() {

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} =userLogin;

  const pageList = useSelector(state => state.pageList);
  const { pages } = pageList;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPages());
    console.log(pages);

  }, [dispatch])

  return (
    <AnimatePresence onExitComplete>
      <Router>
        <div className="App" id="App">
        <HttpsRedirect>
          <Elements stripe={promise}>
            <Cursor />
            <Header/>
            <Route component={Main} path="/" exact/>
            <Route component={Histoire} path="/histoire" exact/>
            <Route component={Contact} path="/contact" exact/>
            <Route component={Product} path="/product/:id"/>
            <Route component={login} path='/login' />
            { userInfo &&
            <Route component={Gestion} path='/gestion' exact/>
            }
            <Route component={Panier} path='/panier/:id?' />
            <Route component={Mentions} path='/mentions-legales' exact />
            <Route component={Utilisation} path='/conditions-utilisation' exact />
            <Route component={Vente} path='/conditions-vente' exact />
            <Route component={Page_1} path='/artiste_1' exact/>
            <Route component={Page_2} path='/artiste_2' exact/>
            <Route component={Page_3} path='/artiste_3' exact/>
            <Route component={Page_4} path='/artiste_4' exact/>
            <Route component={Page_5} path='/artiste_5' exact/>
            <Route component={Page_6} path='/artiste_6' exact/>
            <Route component={Page_7} path='/artiste_7' exact/>
            <Route component={Confirmation} path='/confirmation' exact/>
            <Route component={Resources} path='/resources' exact/>
          </Elements>
        </HttpsRedirect>
        </div>
      </Router>
    </AnimatePresence>

  );
}

export default App;
