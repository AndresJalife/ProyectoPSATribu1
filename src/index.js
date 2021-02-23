import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter  } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter basename={"https://andresjalife.github.io/"} >
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);