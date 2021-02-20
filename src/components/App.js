import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHoras from './../pages/CargaDeHoras';
import Proyecto from '../pages/Proyecto';
import Recursos from './../pages/Recursos';
import Soporte from './../pages/Soporte';
import Main from './../pages/Main';
import {Route} from "react-router";

function App(props) {
  return (
    <div className="App">
        <header>
            This is my website!
        </header>

        <div>
            <Route path="/" component={App}>
                <Route path="/" component={Main} />
                {/* <Route path="/proyecto" component={Proyecto} />*/}
                <Route path="/recursos" component={Recursos} />
                <Route path="/cargadehoras" component={CargaDeHoras} />
                <Route path="/soporte" component={Soporte} />
            </Route>
        </div>

        <footer>
            Your copyright message
        </footer>
    </div>
  );
}

export default App;
