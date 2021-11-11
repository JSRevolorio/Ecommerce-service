import view from "../views/reporteInventario.html";
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

const searchForInvenario = async (producto) => {
  try {
    return await fetch(
      `https://localhost:44366/api/inventario/${producto.nombre}`,
      { method: "GET" }
    ).then((response) => {
      if (!response) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  } catch (error) {
    console.log(error);
  }
};

export default async () => {
  const Element = document.createElement("div");
  Element.innerHTML = view;

  //Funciones o metodos
  const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

  var productos = await getExistencia();

  var valuesProductos = Element.querySelector('.ListProductos');
    valuesProductos.innerHTML = "";
    valuesProductos.innerHTML = `<option id="0" value="0">Seleccione un producto</option>`;
    productos.forEach(producto => {
        valuesProductos.innerHTML += `<option id="${producto.idProducto}" value="${producto.idProducto}">${producto.nombreProducto}</option>`;
    });


  on(Element, "click", "#ListarReporteInventario", async (e) => {
    const combo = Element.querySelector("#IDSelectProducto");

    var producto = {
      nombre: combo.options[combo.selectedIndex].text
    };
console.log(producto);
    Element.querySelector(".tabla-ListaReporteInventario").innerHTML = "";

    var reportes = await searchForInvenario(producto);

    reportes.forEach((inventario) => {
      Element.querySelector(".tabla-ListaReporteInventario").innerHTML += `
            <tr id="${inventario.idProducto}">
            <td>${inventario.nombreProducto}</td>
            <td>${inventario.descripcion}</td>
            <td>${inventario.cantidad}</td>
            </tr>`;
    });
  });

  return Element;
};
