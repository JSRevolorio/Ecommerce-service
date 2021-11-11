import view from '../views/usuario.html';
import * as bootstrap from "bootstrap";

export default async () => {

    const Element = document.createElement('div');
    Element.innerHTML = view;

    return Element;
};