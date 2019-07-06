import './css/style.css'
import {renderBegin,renderShowAuth} from './js/render';
import listen from './js/listen';

document.addEventListener("DOMContentLoaded", () => {
    renderBegin();
    renderShowAuth()
    listen()
});