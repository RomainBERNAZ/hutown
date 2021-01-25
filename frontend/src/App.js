import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../src/components/Header/Header'
import Main from '../src/components/Main/Main'
import Cursor from '../src/components/Cursor/Cursor'
import Shop from '../src/components/Shop/Shop'
import Contact from '../src/components/Contact/Contact'
import Product from './components/Product/Product';
import login from './components/Login/login';
import FirstPhoto from './components/FirstPhoto/FirstPhoto';
import Gestion from './components/Gestion/Gestion'



function App() {


  return (
    <Router>
      <div className="App">
        <Cursor />
        <Header/>
        <Route component={Main} path="/" exact/>
        <Route component={Shop} path="/shop" exact/>
        <Route component={Contact} path="/contact" exact/>
        <Route component={Product} path="/product/:id"/>
        <Route component={login} path='/login' />
        <Route component={Gestion} path='/gestion' exact/>
        <Route component={FirstPhoto} path='/hustle' exact/>
      </div>
    </Router>
  );
}

export default App;
