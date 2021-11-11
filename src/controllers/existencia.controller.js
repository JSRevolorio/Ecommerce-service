import view from '../views/existencia.html';
import * as bootstrap from "bootstrap";

const URL = 'https://localhost:44366/api/Inventario';

const getExistencia = async () =>{
    try {
        const response = await fetch(URL,{ method: 'GET'});

        if(!response.ok){
            throw new Error(response.statusText);
        }

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export default async () => {

    const Element = document.createElement('div');
    Element.innerHTML = view;

    var productos = await getExistencia();

    const on =(element, event, selector, handler)=>{
        element.addEventListener(event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }            
        });
    };

    productos.forEach(producto => {
        Element.querySelector('.tabla-productos').innerHTML +=`
        <tr id="${producto.idProducto}">
        <th scope="row">${producto.idProducto}</th>
        <td>${producto.nombreProducto}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.cantidad}</td>
        </tr>
        `;
    });

    return Element;
};