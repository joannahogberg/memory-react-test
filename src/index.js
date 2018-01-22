import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/tailwind.css';
import { getStatFromLocalStorage } from './utils/localStorage';

const statics = getStatFromLocalStorage();

ReactDOM.render( < App totalPoints = { statics.totalPoints }
        gamesPlayed = { statics.gamesPlayed }
        />, document.getElementById("root"));
        registerServiceWorker();