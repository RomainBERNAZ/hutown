import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from '../src/components/Header/Header'
import Main from '../src/components/Main/Main'
import Cursor from '../src/components/Cursor/Cursor'
import Shop from '../src/components/Shop/Shop'
import Contact from '../src/components/Contact/Contact'
import Product from './components/Product/Product';
import login from './components/Login/login';
import FirstPhoto from './components/FirstPhoto/FirstPhoto';
import Gestion from './components/Gestion/Gestion'
import GuestPage from './components/GuestPage/GuestPage'
import ThirdPage from './components/ThirdPage/ThirdPage'
import Panier from './components/Panier/Panier';


function App() {
  const promise = loadStripe("pk_test_51IIXlWLt56Zxnj4x0gcDCnYTt9sHp9tuknedxFbfvoFJMEShJwAlOq7qqvgaaADwASuIwr1d6NQkSCzVatpoLpfb005n72l4vA");

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} =userLogin;

  return (
    <Router>
      <div className="App">
        <Elements stripe={promise}>
          <Cursor />
          <Header/>
          <Route component={Main} path="/" exact/>
          <Route component={Shop} path="/shop" exact/>
          <Route component={Contact} path="/contact" exact/>
          <Route component={Product} path="/product/:id"/>
          <Route component={login} path='/login' />
          { userInfo &&
          <Route component={Gestion} path='/gestion' exact/>
          }
          <Route component={Panier} path='/panier/:id?' />
          <Route component={FirstPhoto} path='/hustle' exact/>
          <Route component={GuestPage} path='/guest' exact/>
          <Route component={ThirdPage} path='/third' exact/>
        </Elements>
      </div>
    </Router>
  );
}

export default App;
