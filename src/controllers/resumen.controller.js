import view from '../views/resumen.html';
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

//https://localhost:44366/api/Inventario/id=17&mes=11&ano=2021
const getResumen = async (producto, mes, ano) => {
    try {
        const response = await fetch(`https://localhost:44366/api/Inventario/id=${producto}&mes=${mes}&ano=${ano}`,{ method: 'GET'});

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

    const on =(element, event, selector, handler)=>{
        element.addEventListener(event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }            
        });
    };

    var productos = await getExistencia();

    var meses = []

    var mes_text = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var dato = 1;
    mes_text.forEach(mes => {
        var mes = {
            id: dato, 
            value: mes
        }

        meses.push(mes);

        dato+=1;
    });

 

    var valuesProductos = Element.querySelector('.ListProductos');
    valuesProductos.innerHTML = "";
    valuesProductos.innerHTML = `<option id="0" value="0">Seleccione un producto</option>`;
    productos.forEach(producto => {
        valuesProductos.innerHTML += `<option id="${producto.idProducto}" value="${producto.idProducto}">${producto.nombreProducto}</option>`;
    });

    var valuesMes = Element.querySelector('.ListMes');
    valuesMes.innerHTML = "";
    valuesMes.innerHTML = `<option id="0" value="0">Seleccione un Mes</option>`;
    meses.forEach(mes => {
        var fecha = new Date();

        if(mes.id <= (fecha.getMonth()+1))
        {
            valuesMes.innerHTML += `<option id="${mes.id}" value="${mes.id}">${mes.value}</option>`;
        }
    });


    on(Element, 'click', '#ListarResumen', async (e) => {
         var formulario = Element.querySelector('#FormResumen');
         const form = new FormData(formulario);

         var producto = form.get('producto');
         var mes      = form.get('mes');
         var ano      =  form.get('ano');

         console.log(producto);
         console.log(mes);
         console.log(ano);
        
         var resumen = await getResumen(producto, mes, ano);
         console.log(resumen);

         if(resumen.length == 0)
         {
            alert("No existe Datos para el producto seleccionado");
         }

         Element.querySelector('.tabla-productos').innerHTML = "";

         resumen.forEach(producto => {
            Element.querySelector('.tabla-productos').innerHTML +=`
            <tr id="${producto.id}">
            <th scope="row">${producto.id}</th>
            <td>${producto.factura}</td>
            <td>${producto.producto}</td>
            <td>${producto.fecha}</td>
            <td>${producto.compra}</td>
            <td>${producto.venta}</td>
            <td>${producto.inventario}</td>
            </tr>
            `;
         });
         

         console.log(resumen);
    });
    


    return Element;
};