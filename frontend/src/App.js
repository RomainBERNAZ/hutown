import './App.css';

import HttpsRedirect from 'react-https-redirect';
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
import PageFour from './components/PageFour/PageFour'
import PageFive from './components/PageFive/PageFive'
import PageSix from './components/PageSix/PageSix'
import Panier from './components/Panier/Panier';
import Mentions from './components/Footer/Mentions';
import Utilisation from './components/Footer/Utilisation';
import Vente from './components/Footer/Vente';
import Histoire from './components/Histoire/histoire';
import { AnimatePresence } from "framer-motion"
import Confirmation from './components/ConfirmationPage/Confirmation';

const promise = loadStripe("pk_live_51IIXlWLt56Zxnj4xA4lrJXceCjhbBXrFGB0XzYzhuBEtOjhsebBqj1msbirp0N5WkTsQG7bR18LW5p5Pukl16XBm00Y8TcU9eh");
//const promiseTest = loadStripe("pk_test_51IIXlWLt56Zxnj4x0gcDCnYTt9sHp9tuknedxFbfvoFJMEShJwAlOq7qqvgaaADwASuIwr1d6NQkSCzVatpoLpfb005n72l4vA");



function App() {

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} =userLogin;

  return (
    <AnimatePresence onExitComplete>
      <Router>
        <div className="App" id="App">
        <HttpsRedirect>
          <Elements stripe={promise}>
            <Cursor />
            <Header/>
            <Route component={Main} path="/" exact/>
            <Route component={Shop} path="/shop" exact/>
            <Route component={Histoire} path="/histoire" exact/>
            <Route component={Contact} path="/contact" exact/>
            <Route component={Product} path="/product/:id"/>
            <Route component={login} path='/login' />
            { userInfo &&
            <Route component={Gestion} path='/gestion' exact/>
            }
            <Route component={Panier} path='/panier/:id?' />
            <Route component={FirstPhoto} path='/hustle' exact/>
            <Route component={Mentions} path='/mentions-legales' exact />
            <Route component={Utilisation} path='/conditions-utilisation' exact />
            <Route component={Vente} path='/conditions-vente' exact />
            <Route component={GuestPage} path='/guest' exact/>
            <Route component={ThirdPage} path='/third' exact/>
            <Route component={PageFour} path='/four' exact/>
            <Route component={PageFive} path='/five' exact/>
            <Route component={PageSix} path='/six' exact/>
            <Route component={Confirmation} path='/confirmation' exact/>
          </Elements>
        </HttpsRedirect>
        </div>
      </Router>
    </AnimatePresence>

  );
}

export default App;
